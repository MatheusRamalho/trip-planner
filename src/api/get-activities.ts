import { api } from '@/libs/axios'

interface getActivitiesParams {
    tripId: string
}

interface getActivitiesResponse {
    activities: {
        date: string
        activities: {
            id: string
            title: string
            occurs_at: string
        }[]
    }[]
}

export async function getActivities({ tripId }: getActivitiesParams) {
    const response = await api.get<getActivitiesResponse>(
        `/trips/${tripId}/activities`,
    )

    return response.data
}
