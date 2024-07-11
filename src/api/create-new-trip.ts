/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface createNewTripParams {
    destination: string
    starts_at: Date
    ends_at: Date
    emails_to_invite: string[]
    owner_name: string
    owner_email: string
}

interface CreateNewTripResponse {
    tripId: string
}

export async function createNewTrip({
    destination,
    starts_at,
    ends_at,
    emails_to_invite,
    owner_name,
    owner_email,
}: createNewTripParams): Promise<CreateNewTripResponse> {
    const response = await api.post<CreateNewTripResponse>('/trips', {
        destination,
        starts_at,
        ends_at,
        emails_to_invite,
        owner_name,
        owner_email,
    })

    return response.data
}
