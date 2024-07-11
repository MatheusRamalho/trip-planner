/* eslint-disable camelcase */
import { api } from '@/libs/axios'

interface createNewLinkParams {
    tripId: string
    title: string
    url: string
}

export async function createNewLink({
    tripId,
    title,
    url,
}: createNewLinkParams) {
    const response = await api.post(`trips/${tripId}/links`, {
        title,
        url,
    })

    return response.data
}
