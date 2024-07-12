/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface createNewActivityParams {
    tripId: string
    title: string
    occurs_at: string
}

interface createNewActivityResponse {
    activityId: string
}

export async function createNewActivity({
    tripId,
    title,
    occurs_at,
}: createNewActivityParams): Promise<createNewActivityResponse> {
    const response = await api.post<createNewActivityResponse>(
        `trips/${tripId}/activities`,
        {
            title,
            occurs_at,
        },
    )

    return response.data
}
