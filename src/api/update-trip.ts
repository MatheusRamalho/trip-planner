/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface updateTripParams {
    tripId: string
    destination: string
    starts_at: Date
    ends_at: Date
}

export async function updateTrip({
    tripId,
    destination,
    starts_at,
    ends_at,
}: updateTripParams) {
    const response = await api.put(`/trips/${tripId}`, {
        destination,
        starts_at,
        ends_at,
    })

    return response.data
}
