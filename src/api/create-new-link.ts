import { api } from '@/libs/axios'

interface createNewLinkParams {
    tripId: string
    title: string
    url: string
}

interface createNewLinkResponse {
    tripId: string
    title: string
    url: string
}

export async function createNewLink({
    tripId,
    title,
    url,
}: createNewLinkParams): Promise<createNewLinkResponse> {
    const response = await api.post<createNewLinkResponse>(
        `trips/${tripId}/links`,
        {
            title,
            url,
        },
    )

    return response.data
}
