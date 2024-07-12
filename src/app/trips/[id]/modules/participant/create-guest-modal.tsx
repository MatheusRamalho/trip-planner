/* eslint-disable camelcase */
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { createNewParticipant } from '@/api/create-new-participant'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Toast } from '@/components/Toast'
import { Loading } from '@/components/Loading'
import { Input } from '@/components/Input'

const participantSchema = zod.object({
    email: zod.string().email({ message: 'Informe um email válido!' }),
})

type ParticipantSchemaData = zod.infer<typeof participantSchema>

interface CreateGuestModalProps {
    tripId: string
    closeCreateGuestModal: () => void
}

export function CreateGuestModal({
    tripId,
    closeCreateGuestModal,
}: CreateGuestModalProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ParticipantSchemaData>({
        resolver: zodResolver(participantSchema),
    })

    const {
        mutateAsync: mutationCreateNewParticipant,
        isSuccess,
        isError,
        isPending,
    } = useMutation({
        mutationFn: createNewParticipant,
    })

    async function createActivity({ email }: ParticipantSchemaData) {
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
            reset()

            setTimeout(() => {
                closeCreateGuestModal()
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
                message="Convite enviado com sucesso!"
            />
        )
    }

    if (isError) {
        return (
            <Toast isVisible type="error" message="Erro ao enviar convite!" />
        )
    }

    return (
        <Dialog
            title="Convidar participante"
            description="O convidado ira receber e-mail para confirmar a participação na viagem."
            onClose={closeCreateGuestModal}
        >
            <form onSubmit={handleSubmit(createActivity)} className="space-y-3">
                <Input
                    name="email"
                    type="email"
                    placeholder="Digite o email do convidado"
                    control={control}
                    error={errors}
                    icon="mail"
                />

                <Button
                    disabled={isPending}
                    name={isPending ? 'Carregando...' : 'Convidar participante'}
                    type="submit"
                    className="w-full"
                />
            </form>
        </Dialog>
    )
}
