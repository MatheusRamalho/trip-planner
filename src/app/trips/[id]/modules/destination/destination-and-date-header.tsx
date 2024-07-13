import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTripDetails } from '@/api/get-trip-details'
// import { updateTrip } from '@/api/update-trip'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'
import { Skeleton } from '@/components/Skeleton'
import { Divider } from '@/components/Divider'

interface DestinationAndDateHeaderProps {
    tripId: string
}

export function DestinationAndDateHeader({
    tripId,
}: DestinationAndDateHeaderProps) {
    const { data, isFetching } = useQuery({
        queryKey: ['trip-details', tripId],
        queryFn: () => getTripDetails({ tripId }),
    })

    // const { mutateAsync: mutationUpdateTrip } = useMutation({
    //     mutationFn: updateTrip,
    // })

    // async function createActivity(event: FormEvent<HTMLFormElement>) {
    //     event.preventDefault()

    //     try {
    //         await mutationUpdateTrip({
    //             tripId,
    //             destination,
    //             starts_at,
    //             ends_at,
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //     }
    // }

    return (
        <div className="w-full h-auto mx-auto p-4 sm:h-16 sm:py-0 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between gap-3 flex-col sm:flex-row">
            {isFetching ? (
                <Skeleton className="w-40 h-8" />
            ) : (
                <div className="flex items-center gap-2 sm:flex-1 h-10">
                    <Icon name="map-pin" className="size-5 text-zinc-400" />

                    <span className="text-base text-zinc-100">
                        {data?.trip.destination}
                    </span>
                </div>
            )}

            <div className="w-full sm:w-auto flex items-center flex-col sm:flex-row gap-5">
                {isFetching ? (
                    <Skeleton className="w-40 h-8" />
                ) : (
                    <div className="flex items-center gap-2 h-10">
                        <Icon
                            name="calendar"
                            className="size-5 text-zinc-400"
                        />

                        <span className="text-base text-zinc-100">
                            {data?.trip &&
                                format(data?.trip.starts_at, "d ' de 'LLL")
                                    .concat(' até ')
                                    .concat(
                                        format(
                                            data?.trip.ends_at,
                                            "d ' de 'LLL",
                                        ),
                                    )}
                        </span>
                    </div>
                )}

                <Divider variant="vertical" />

                {isFetching ? (
                    <Skeleton className="w-40 h-8" />
                ) : (
                    <Button
                        variant="secondary"
                        name="Alterar local/data"
                        icon="settings-2"
                        className="w-full sm:w-fit"
                    />
                )}
            </div>
        </div>
    )
}
