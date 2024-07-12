import { api } from '@/libs/axios'

interface getLinksParams {
    tripId: string
}

interface getLinksResponse {
    links: {
        id: string
        title: string
        url: string
    }[]
}

export async function getLinks({ tripId }: getLinksParams) {
    const response = await api.get<getLinksResponse>(`/trips/${tripId}/links`)

    return response.data
}
