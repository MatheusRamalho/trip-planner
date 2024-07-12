/* eslint-disable camelcase */
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { createNewLink } from '@/api/create-new-link'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Toast } from '@/components/Toast'
import { Input } from '@/components/Input'
import { Loading } from '@/components/Loading'

const linkSchema = zod.object({
    title: zod.string({ message: 'Informe um nome!' }),
    url: zod.string().url({ message: 'Informe uma url válida!' }),
})

type LinkSchemaData = zod.infer<typeof linkSchema>

interface CreateLinkModalProps {
    tripId: string
    closeCreateImportantLinkModal: () => void
}

export function CreateLinkModal({
    tripId,
    closeCreateImportantLinkModal,
}: CreateLinkModalProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LinkSchemaData>({
        resolver: zodResolver(linkSchema),
    })

    const {
        mutateAsync: mutationCreateNewLink,
        isSuccess,
        isError,
        isPending,
    } = useMutation({
        mutationFn: createNewLink,
    })

    async function createActivity({ title, url }: LinkSchemaData) {
        if (!title || !url) {
            return
        }

        try {
            await mutationCreateNewLink({
                tripId,
                title,
                url,
            })
        } catch (error) {
            console.error(error)
        } finally {
            reset()

            setTimeout(() => {
                closeCreateImportantLinkModal()
            }, 10000)
        }
    }

    if (isPending) {
        return <Loading />
    }

    if (isSuccess) {
        return (
            <Toast
                isVisible
                type="success"
                message="Link criado com sucesso!"
            />
        )
    }

    if (isError) {
        return <Toast isVisible type="error" message="Erro ao criar link!" />
    }

    return (
        <Dialog
            title="Cadastrar link"
            description="Todos convidados podem visualizar os links importantes."
            onClose={closeCreateImportantLinkModal}
        >
            <form onSubmit={handleSubmit(createActivity)} className="space-y-3">
                <Input
                    name="title"
                    type="text"
                    placeholder="Título do link"
                    control={control}
                    error={errors}
                    icon="tag"
                />

                <Input
                    name="url"
                    type="url"
                    placeholder="URL"
                    control={control}
                    error={errors}
                    icon="link-2"
                />

                <Button
                    disabled={isPending}
                    name={isPending ? 'Carregando...' : 'Salvar link'}
                    type="submit"
                    className="w-full"
                />
            </form>
        </Dialog>
    )
}
