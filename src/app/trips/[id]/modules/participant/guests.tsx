import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getParticipants } from '@/api/get-participants'
import { Button } from '@/components/Button'
import {
    GuestPresence,
    GuestPresenceSkeleton,
} from '@/components/GuestPresence'

interface GuestsProps {
    tripId: string
    openCreateGuestModal: () => void
}

export function Guests({ tripId, openCreateGuestModal }: GuestsProps) {
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['trip-details-guests', tripId],
        queryFn: () => getParticipants({ tripId }),
        refetchInterval: 10000,
    })

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl"> Convidados </h2>

            <div className="space-y-5">
                {isFetching ? (
                    Array.from({ length: 5 }, (_, index) => (
                        <GuestPresenceSkeleton key={index + 1} />
                    ))
                ) : (
                    <>
                        {data &&
                            data.participants.length > 0 &&
                            data.participants.map((participant, index) => {
                                return (
                                    <GuestPresence
                                        key={participant.id}
                                        name={
                                            participant.name ||
                                            `Convidado ${index}`
                                        }
                                        email={participant.email}
                                        isConfirmed={participant.is_confirmed}
                                    />
                                )
                            })}
                    </>
                )}
            </div>

            <Button
                variant="secondary"
                name="Gerenciar convidados"
                icon="user-cog"
                className="w-full"
                onClick={openCreateGuestModal}
            />
        </div>
    )
}
