import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useQuery } from '@tanstack/react-query'

import { getActivities } from '@/api/get-activities'
import { Activity } from '@/components/Activity'
import { Skeleton } from '@/components/Skeleton'
import { useEffect } from 'react'

interface ActivitiesProps {
    tripId: string
}

export function Activities({ tripId }: ActivitiesProps) {
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['trip-details-activities', tripId],
        queryFn: () => getActivities({ tripId }),
        refetchInterval: 10000,
    })

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <div className="space-y-8">
            {isFetching ? (
                Array.from({ length: 10 }, (_, index) => (
                    <div key={index + 1}>
                        <div className="flex gap-2">
                            <Skeleton className="w-20 h-6" />
                            <Skeleton className="w-10 h-6" />
                        </div>

                        <Skeleton className="w-full h-8 mt-3" />
                    </div>
                ))
            ) : (
                <>
                    {data &&
                        data.activities &&
                        data.activities.length > 0 &&
                        data.activities.map((day) => {
                            return (
                                <Activity.Root
                                    key={day.date}
                                    dayOfMonth={`Dia ${format(day.date, 'd')}`}
                                    dayOfTheWeek={format(day.date, 'EEEE', {
                                        locale: ptBR,
                                    })}
                                >
                                    {day.activities &&
                                    day.activities.length > 0 ? (
                                        day.activities.map((activity) => {
                                            return (
                                                <Activity.Item
                                                    key={activity.id}
                                                    name={activity.title}
                                                    hour={`${format(
                                                        activity.occurs_at,
                                                        'HH:mm',
                                                    )}h`}
                                                />
                                            )
                                        })
                                    ) : (
                                        <p className="text-sm text-zinc-500">
                                            Nenhuma atividade cadastrada nessa
                                            data.
                                        </p>
                                    )}
                                </Activity.Root>
                            )
                        })}
                </>
            )}
        </div>
    )
}
