import { FormEvent } from 'react'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (name: string) => void
    setOwnerEmail: (email: string) => void
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    setOwnerName,
    setOwnerEmail,
    createTrip,
}: ConfirmTripModalProps) {
    return (
        <Dialog
            title="Confirmar criação da viagem"
            description={`Para concluir a criação da viagem para Florianópolis, Brasil nas datas de 16 a 27 de Agosto de 2024 preencha seus dados abaixo:`}
            onClose={closeConfirmTripModal}
        >
            <form onSubmit={createTrip} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="user" className="size-5 text-zinc-400" />

                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Seu nome completo"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        onChange={(event) => setOwnerName(event.target.value)}
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
                        onChange={(event) => setOwnerEmail(event.target.value)}
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
