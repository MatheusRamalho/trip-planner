import { api } from '@/libs/axios'

interface getParticipantsParams {
    tripId: string
}

interface getParticipantsResponse {
    participants: {
        id: string
        name: string | null
        email: string
        is_confirmed: boolean
    }[]
}

export async function getParticipants({ tripId }: getParticipantsParams) {
    const response = await api.get<getParticipantsResponse>(
        `/trips/${tripId}/participants`,
    )

    return response.data
}
