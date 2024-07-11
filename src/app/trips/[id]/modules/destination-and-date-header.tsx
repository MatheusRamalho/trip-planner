import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import { getTripDetails } from '@/api/get-trip-details'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'
import { Skeleton } from '@/components/Skeleton'

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

    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between gap-3">
            {isFetching ? (
                <Skeleton className="w-40 h-8" />
            ) : (
                <div className="flex items-center gap-2 flex-1">
                    <Icon name="map-pin" className="size-5 text-zinc-400" />

                    <span className="text-base text-zinc-100">
                        {data?.trip.destination}
                    </span>
                </div>
            )}

            <div className="flex items-center gap-5">
                {isFetching ? (
                    <Skeleton className="w-40 h-8" />
                ) : (
                    <div className="flex items-center gap-2">
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

                <div className="w-px h-6 bg-zinc-700" />

                {isFetching ? (
                    <Skeleton className="w-40 h-8" />
                ) : (
                    <Button
                        variant="secondary"
                        name="Alterar local/data"
                        icon="settings-2"
                    />
                )}
            </div>
        </div>
    )
}
