/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface confirmParticipantParams {
    participantId: string
}

export async function confirmParticipant({
    participantId,
}: confirmParticipantParams) {
    const response = await api.patch(`/participants/${participantId}/confirm`)

    return response.data
}
