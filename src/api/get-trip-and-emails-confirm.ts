import { api } from '@/libs/axios'

interface getTripAndEmailsConfirmParams {
    tripId: string
}

export async function getTripAndEmailsConfirm({
    tripId,
}: getTripAndEmailsConfirmParams) {
    const response = await api.get(`/trips/${tripId}/confirm`)

    return response.data
}
