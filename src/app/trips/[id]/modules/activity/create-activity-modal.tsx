/* eslint-disable camelcase */
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { createNewActivity } from '@/api/create-new-activity'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Toast } from '@/components/Toast'
import { Loading } from '@/components/Loading'
import { Input } from '@/components/Input'

const activitySchema = zod.object({
    title: zod.string({ message: 'Informe um nome válido!' }),
    occurs_at: zod.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Data e hora inválida',
    }),
})

type ActivitySchemaData = zod.infer<typeof activitySchema>

interface CreateAcitvityModalProps {
    tripId: string
    closeActivityModal: () => void
}

export function CreateAcitvityModal({
    tripId,
    closeActivityModal,
}: CreateAcitvityModalProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ActivitySchemaData>({
        resolver: zodResolver(activitySchema),
    })

    const {
        mutateAsync: mutationCreateNewActivity,
        isSuccess,
        isError,
        isPending,
    } = useMutation({
        mutationFn: createNewActivity,
    })

    async function createActivity({ title, occurs_at }: ActivitySchemaData) {
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
            reset()

            setTimeout(() => {
                closeActivityModal()
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
                message="Atividade criada com sucesso!"
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
            title="Cadastrar atividade"
            description="Todos convidados podem visualizar as atividades."
            onClose={closeActivityModal}
        >
            <form onSubmit={handleSubmit(createActivity)} className="space-y-3">
                <Input
                    name="title"
                    type="text"
                    placeholder="Qual a atividade?"
                    control={control}
                    error={errors}
                    icon="tag"
                />

                <Input
                    name="occurs_at"
                    type="datetime-local"
                    placeholder="Data"
                    control={control}
                    error={errors}
                    icon="calendar"
                />

                <Button
                    disabled={isPending}
                    name={isPending ? 'Carregando...' : 'Salvar atividade'}
                    type="submit"
                    className="w-full"
                />
            </form>
        </Dialog>
    )
}
