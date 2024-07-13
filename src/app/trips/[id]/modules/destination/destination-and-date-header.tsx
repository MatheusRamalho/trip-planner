import { FormEvent, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'

import { getTripDetails } from '@/api/get-trip-details'
import { updateTrip } from '@/api/update-trip'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'
import { Skeleton } from '@/components/Skeleton'
import { Divider } from '@/components/Divider'
import { Loading } from '@/components/Loading'
import { Toast } from '@/components/Toast'

import { UpdateDestinationAndDateTripModal } from './update-destination-and-date-modal'

interface DestinationAndDateHeaderProps {
    tripId: string
}

export function DestinationAndDateHeader({
    tripId,
}: DestinationAndDateHeaderProps) {
    const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] =
        useState<boolean>(false)

    const [destination, setDestination] = useState('')

    const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
        DateRange | undefined
    >()

    const { data, isFetching } = useQuery({
        queryKey: ['trip-details', tripId],
        queryFn: () => getTripDetails({ tripId }),
        refetchInterval: 10000,
    })

    const {
        mutateAsync: mutationUpdateTrip,
        isSuccess,
        isError,
        isPending,
    } = useMutation({
        mutationFn: updateTrip,
    })

    function openUpdateTripModal() {
        setIsUpdateTripModalOpen(true)
    }

    function closeUpdateTripModal() {
        setIsUpdateTripModalOpen(false)
    }

    async function onUpdateTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!destination) {
            return
        }

        if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) {
            return
        }

        try {
            await mutationUpdateTrip({
                tripId,
                destination,
                starts_at: eventStartAndEndDate.from,
                ends_at: eventStartAndEndDate.to,
            })
        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload()
        }
    }

    if (isPending) {
        return <Loading />
    }

    if (isSuccess) {
        return (
            <Toast
                isVisible
                type="success"
                message="Viagem atualizada com sucesso!"
            />
        )
    }

    if (isError) {
        return (
            <Toast isVisible type="error" message="Erro ao atualizar viagem!" />
        )
    }

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
                        onClick={openUpdateTripModal}
                    />
                )}
            </div>

            {isUpdateTripModalOpen && (
                <UpdateDestinationAndDateTripModal
                    closeUpdateTripModal={closeUpdateTripModal}
                    setDestination={setDestination}
                    eventStartAndEndDate={eventStartAndEndDate}
                    setEventStartAndEndDate={setEventStartAndEndDate}
                    updateTrip={onUpdateTrip}
                />
            )}
        </div>
    )
}
