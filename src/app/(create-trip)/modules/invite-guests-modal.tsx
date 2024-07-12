import { FormEvent } from 'react'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Email } from '@/components/Email'
import { Icon } from '@/components/Icon'
import { Divider } from '@/components/Divider'

interface InviteGuestsModalProps {
    emailsToInvite: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromInvites: (email: string) => void
    closeGuestModal: () => void
}

export function InviteGuestsModal({
    emailsToInvite,
    addNewEmailToInvite,
    removeEmailFromInvites,
    closeGuestModal,
}: InviteGuestsModalProps) {
    return (
        <Dialog
            title="Selecionar convidados"
            description="Os convidados irão receber e-mails para confirmar a participação na viagem."
            onClose={closeGuestModal}
        >
            <div className="flex flex-wrap gap-2">
                {emailsToInvite.length > 0 &&
                    emailsToInvite.map((email, index) => {
                        return (
                            <Email
                                key={email + index}
                                email={email}
                                onClick={() => removeEmailFromInvites(email)}
                            />
                        )
                    })}
            </div>

            <Divider className="w-full" />

            <form
                onSubmit={addNewEmailToInvite}
                className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center justify-between gap-2 flex-col sm:flex-row"
            >
                <div className="flex-1 flex items-center gap-2 px-2">
                    <Icon name="mail" className="size-5 text-zinc-400" />

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Digite o e-mail do convidado"
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    />
                </div>

                <Button
                    name="Convidar"
                    icon="plus"
                    type="submit"
                    className="w-full sm:w-fit"
                />
            </form>
        </Dialog>
    )
}
