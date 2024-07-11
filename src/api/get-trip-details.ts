import { api } from '@/libs/axios'

interface getTripDetailsParams {
    tripId: string
}

interface getTripDetailsResponse {
    trip: {
        id: string
        destination: string
        starts_at: string
        ends_at: string
        is_confirmed: boolean
    }
}

export async function getTripDetails({ tripId }: getTripDetailsParams) {
    const response = await api.get<getTripDetailsResponse>(`/trips/${tripId}`)

    return response.data
}
