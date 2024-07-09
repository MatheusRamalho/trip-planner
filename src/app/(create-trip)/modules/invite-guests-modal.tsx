import { Dispatch, FormEvent, SetStateAction } from 'react'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Email } from '@/components/Email'
import { Icon } from '@/components/Icon'

interface InviteGuestsModalProps {
    guests: string[]
    setGuests: Dispatch<SetStateAction<string[]>>
    onClose: () => void
}

export function InviteGuestsModal({
    guests,
    setGuests,
    onClose,
}: InviteGuestsModalProps) {
    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        if (guests.includes(email)) {
            return
        }

        setGuests([...guests, email])

        event.currentTarget.reset()
    }

    function removeEmailFromInvite(emailToRemove: string) {
        const newEmailList = guests.filter((email) => email !== emailToRemove)

        setGuests(newEmailList)
    }

    return (
        <Dialog
            title="Selecionar convidados"
            description="Os convidados irão receber e-mails para confirmar a participação na viagem."
            onClose={onClose}
        >
            <div className="flex flex-wrap gap-2">
                {guests.length > 0 &&
                    guests.map((email, index) => {
                        return (
                            <Email
                                key={email + index}
                                email={email}
                                onClick={() => removeEmailFromInvite(email)}
                            />
                        )
                    })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
                onSubmit={addNewEmailToInvite}
                className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-2"
            >
                <div className="flex-1 flex items-center gap-2 px-2">
                    <Icon name="at-sign" className="size-5 text-zinc-400" />

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Digite o e-mail do convidado"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                <Button
                    variant="primary"
                    name="Convidar"
                    icon="plus"
                    type="submit"
                />
            </form>
        </Dialog>
    )
}
