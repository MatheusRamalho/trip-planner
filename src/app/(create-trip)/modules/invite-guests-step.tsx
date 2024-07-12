import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
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
        <div className="w-72 h-auto mx-auto p-4 sm:w-full sm:h-16 sm:py-0 bg-zinc-900 rounded-xl flex items-center gap-3 flex-col sm:flex-row shadow-shape">
            <button
                type="button"
                className="flex items-center gap-2 flex-1 py-3"
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

            <Divider variant="vertical" />

            <Button
                name="Confirmar viagem"
                icon="arrow-right"
                onClick={openConfirmTripModal}
                className="w-full sm:w-fit"
            />
        </div>
    )
}
