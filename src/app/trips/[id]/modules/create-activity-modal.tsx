/* eslint-disable camelcase */
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { api } from '@/libs/axios'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'

interface CreateAcitvityModalProps {
    closeActivityModal: () => void
}

export function CreateAcitvityModal({
    closeActivityModal,
}: CreateAcitvityModalProps) {
    const router = useRouter()

    function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs_at')?.toString()

        api.post(`trips/${params.id}/activities`, {
            title,
            occurs_at,
        })

        router.refresh()
        // closeActivityModal()
    }

    return (
        <Dialog
            title="Cadastrar atividade"
            description="Todos convidados podem visualizar as atividades."
            onClose={closeActivityModal}
        >
            <form onSubmit={createActivity} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="tag" className="size-5 text-zinc-400" />

                    <input
                        id="activity"
                        type="text"
                        name="title"
                        placeholder="Qual a atividade?"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="calendar" className="size-5 text-zinc-400" />

                    <input
                        id="date"
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
    )
}
