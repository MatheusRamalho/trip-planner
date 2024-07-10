import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'

interface ConfirmTripModalProps {
    onClose: () => void
}

export function ConfirmTripModal({ onClose }: ConfirmTripModalProps) {
    const router = useRouter()

    function createNewTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        router.push('/trip-details/')
    }

    return (
        <Dialog
            title="Confirmar criação da viagem"
            description={`Para concluir a criação da viagem para Florianópolis, Brasil nas datas de 16 a 27 de Agosto de 2024 preencha seus dados abaixo:`}
            onClose={onClose}
        >
            <form onSubmit={createNewTrip} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="user" className="size-5 text-zinc-400" />

                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Seu nome completo"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="mail" className="size-5 text-zinc-400" />

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Seu e-mail pessoal"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                <Button
                    name="Confirmar criação da viagem"
                    type="submit"
                    className="w-full"
                />
            </form>
        </Dialog>
    )
}
