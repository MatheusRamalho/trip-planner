import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getLinks } from '@/api/get-links'
import { Anchor, AnchorSkeleton } from '@/components/Anchor'
import { Button } from '@/components/Button'

interface ImportantLinksProps {
    tripId: string
    openCreateImportantLinkModal: () => void
}

export function ImportantLinks({
    tripId,
    openCreateImportantLinkModal,
}: ImportantLinksProps) {
    const { data, refetch, isFetching } = useQuery({
        queryKey: ['trip-details-links', tripId],
        queryFn: () => getLinks({ tripId }),
        refetchInterval: 10000,
    })

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl"> Links importantes </h2>

            <div className="space-y-5">
                {isFetching ? (
                    Array.from({ length: 3 }, (_, index) => (
                        <AnchorSkeleton key={index + 1} />
                    ))
                ) : (
                    <>
                        {data &&
                            data.links &&
                            data.links.length > 0 &&
                            data.links.map((link) => {
                                return (
                                    <Anchor
                                        key={link.id}
                                        name={link.title}
                                        link={link.url}
                                    />
                                )
                            })}
                    </>
                )}
            </div>

            <Button
                variant="secondary"
                name="Cadastrar novo link"
                icon="plus"
                className="w-full"
                onClick={openCreateImportantLinkModal}
            />
        </div>
    )
}
