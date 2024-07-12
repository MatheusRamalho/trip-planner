/* eslint-disable camelcase */
import { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'

import { createNewActivity } from '@/api/create-new-activity'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'
import { Toast } from '@/components/Toast'

interface CreateAcitvityModalProps {
    tripId: string
    closeActivityModal: () => void
}

export function CreateAcitvityModal({
    tripId,
    closeActivityModal,
}: CreateAcitvityModalProps) {
    const {
        mutateAsync: mutationCreateNewActivity,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: createNewActivity,
    })

    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs_at')?.toString()

        if (!title || !occurs_at) {
            return
        }

        try {
            await mutationCreateNewActivity({
                tripId,
                title,
                occurs_at,
            })
        } catch (error) {
            console.error(error)
        } finally {
            closeActivityModal()
        }
    }

    return (
        <>
            {isSuccess && (
                <Toast
                    isVisible
                    type="success"
                    message="Atividade criada com sucesso!"
                />
            )}

            {isError && (
                <Toast
                    isVisible
                    type="error"
                    message="Erro ao criar atividade!"
                />
            )}

            <Dialog
                title="Cadastrar atividade"
                description="Todos convidados podem visualizar as atividades."
                onClose={closeActivityModal}
            >
                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Icon name="tag" className="size-5 text-zinc-400" />

                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Qual a atividade?"
                            className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        />
                    </div>

                    <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Icon
                            name="calendar"
                            className="size-5 text-zinc-400"
                        />

                        <input
                            id="occurs_at"
                            type="datetime-local"
                            name="occurs_at"
                            placeholder="Data"
                            className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        />
                    </div>

                    <Button
                        name="Salvar atividade"
                        type="submit"
                        className="w-full"
                    />
                </form>
            </Dialog>
        </>
    )
}
