/* eslint-disable camelcase */
import { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'

import { createNewParticipant } from '@/api/create-new-participant'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'
import { Toast } from '@/components/Toast'

interface CreateGuestModalProps {
    tripId: string
    closeCreateGuestModal: () => void
}

export function CreateGuestModal({
    tripId,
    closeCreateGuestModal,
}: CreateGuestModalProps) {
    const {
        mutateAsync: mutationCreateNewParticipant,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: createNewParticipant,
    })

    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        try {
            await mutationCreateNewParticipant({
                tripId,
                email,
            })
        } catch (error) {
            console.error(error)
        } finally {
            closeCreateGuestModal()
        }
    }

    return (
        <>
            {isSuccess && (
                <Toast
                    isVisible
                    type="success"
                    message="Convite enviado com sucesso!"
                />
            )}

            {isError && (
                <Toast
                    isVisible
                    type="error"
                    message="Erro ao enviar convite!"
                />
            )}

            <Dialog
                title="Convidar participante"
                description="O convidado ira receber e-mail para confirmar a participação na viagem."
                onClose={closeCreateGuestModal}
            >
                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Icon name="mail" className="size-5 text-zinc-400" />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Digite o email do convidado"
                            className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        />
                    </div>

                    <Button
                        name="Convidar participante"
                        type="submit"
                        className="w-full"
                    />
                </form>
            </Dialog>
        </>
    )
}
