import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    openGuestInput: () => void
    closeGuestInput: () => void
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    openGuestInput,
    closeGuestInput,
}: DestinationAndDateStepProps) {
    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center gap-3 shadow-shape">
            <div className="flex items-center gap-2 flex-1">
                <Icon name="map-pin" className="size-5 text-zinc-400" />

                <input
                    className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    type="text"
                    placeholder="Para onde você vai?"
                    disabled={isGuestsInputOpen}
                />
            </div>

            <div className="flex items-center gap-2">
                <Icon name="calendar" className="size-5 text-zinc-400" />

                <input
                    className="w-40 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    type="text"
                    placeholder="Quando?"
                    disabled={isGuestsInputOpen}
                />
            </div>

            <div className="w-px h-6 bg-zinc-700" />

            {isGuestsInputOpen ? (
                <Button
                    variant="secondary"
                    name="Alterar local/data"
                    icon="settings-2"
                    onClick={closeGuestInput}
                />
            ) : (
                <Button
                    name="Continuar"
                    icon="arrow-right"
                    onClick={openGuestInput}
                />
            )}
        </div>
    )
}
