import { useState, useEffect } from 'react'

import { api } from '@/libs/axios'
import { ParticipantType } from '@/types/Participant'
import { Button } from '@/components/Button'
import { GuestPresence } from '@/components/GuestPresence'

export function Guests() {
    const [participants, setParticipants] = useState<ParticipantType[]>([])

    useEffect(() => {
        api.get(`/trips/${params.id}/participants`).then((response) =>
            setParticipants(response.data.participants),
        )
    }, [params.id])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl"> Convidados </h2>

            <div className="space-y-5">
                {participants &&
                    participants.length > 0 &&
                    participants.map((participant, index) => {
                        return (
                            <GuestPresence
                                key={participant.id}
                                name={participant.name || `Convidado ${index}`}
                                email={participant.email}
                                isConfirmed={participant.is_confirmed}
                            />
                        )
                    })}
            </div>

            <Button
                variant="secondary"
                name="Gerenciar convidados"
                icon="user-cog"
                className="w-full"
            />
        </div>
    )
}
