import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'

interface CreateAcitvityModalProps {
    onClose: () => void
}

export function CreateAcitvityModal({ onClose }: CreateAcitvityModalProps) {
    const router = useRouter()

    function createNewTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        router.push('/trip-details/')
    }

    return (
        <Dialog
            title="Cadastrar atividade"
            description="Todos convidados podem visualizar as atividades."
            onClose={onClose}
        >
            <form onSubmit={createNewTrip} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="tag" className="size-5 text-zinc-400" />

                    <input
                        id="activity"
                        type="text"
                        name="activity"
                        placeholder="Qual a atividade?"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="calendar" className="size-5 text-zinc-400" />

                    <input
                        id="date"
                        type="datetime-local"
                        name="date"
                        placeholder="Data"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                {/* <div className="flex items-center gap-2">
                    <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Icon
                            name="calendar"
                            className="size-5 text-zinc-400"
                        />

                        <input
                            id="date"
                            type="date"
                            name="date"
                            placeholder="Data"
                            className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        />
                    </div>

                    <div className="w-36 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Icon name="clock" className="size-5 text-zinc-400" />

                        <input
                            id="text"
                            type="time"
                            name="text"
                            placeholder="Horário"
                            className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        />
                    </div>
                </div> */}

                <Button
                    name="Salvar atividade"
                    type="submit"
                    className="w-full"
                />
            </form>
        </Dialog>
    )
}
