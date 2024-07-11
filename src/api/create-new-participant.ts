/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface createNewParticipantParams {
    tripId: string
    email: string
}

export async function createNewParticipant({
    tripId,
    email,
}: createNewParticipantParams) {
    const response = await api.post(`trips/${tripId}/invites`, {
        email,
    })

    return response.data
}
