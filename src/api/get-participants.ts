import { api } from '@/libs/axios'
import { ParticipantType } from '@/types/Participant'

interface getParticipantsParams {
    tripId: string
}

export async function getParticipants({ tripId }: getParticipantsParams) {
    const response = await api.get<ParticipantType>(
        `/trips/${tripId}/participants`,
    )

    return response.data
}
