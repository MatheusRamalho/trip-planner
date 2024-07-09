import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

interface InviteGuestsStepProps {
    emailsToInvite: string[]
    openGuestModal: () => void
    openConfirmTripModal: () => void
}

export function InviteGuestsStep({
    emailsToInvite,
    openGuestModal,
    openConfirmTripModal,
}: InviteGuestsStepProps) {
    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center gap-3 shadow-shape">
            <button
                type="button"
                className="flex items-center gap-2 flex-1"
                onClick={openGuestModal}
            >
                <Icon name="user-round-plus" className="size-5 text-zinc-400" />

                {emailsToInvite.length > 0 ? (
                    <span className="flex-1 text-left text-zinc-100 text-lg">
                        {emailsToInvite.length} pessoa(s) convidada(s)
                    </span>
                ) : (
                    <span className="flex-1 text-left text-zinc-400 text-lg">
                        Quem estará na viagem?
                    </span>
                )}
            </button>

            <div className="w-px h-6 bg-zinc-700" />

            <Button
                variant="primary"
                name="Confirmar viagem"
                icon="arrow-right"
                onClick={openConfirmTripModal}
            />
        </div>
    )
}
