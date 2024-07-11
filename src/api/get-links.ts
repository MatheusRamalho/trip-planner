import { api } from '@/libs/axios'

import { LinkType } from '@/types/Link'

interface getLinksParams {
    tripId: string
}

export async function getLinks({ tripId }: getLinksParams) {
    const response = await api.get<LinkType>(`/trips/${tripId}/links`)

    return response.data
}
