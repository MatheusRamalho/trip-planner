/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface createNewActivityParams {
    tripId: string
    title: string
    occurs_at: string
}

export async function createNewActivity({
    tripId,
    title,
    occurs_at,
}: createNewActivityParams) {
    const response = await api.post(`trips/${tripId}/activities`, {
        title,
        occurs_at,
    })

    return response.data
}
