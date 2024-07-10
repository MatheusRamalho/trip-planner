import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'

export function DestinationAndDateHeader() {
    return (
        <div className="h-16 px-4 bg-zinc-900 rounded-xl shadow-shape flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
                <Icon name="map-pin" className="size-5 text-zinc-400" />

                <span className="text-base text-zinc-100">Vitória, Brasil</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Icon name="calendar" className="size-5 text-zinc-400" />

                    <span className="text-base text-zinc-100">
                        17 a 23 de agosto
                    </span>
                </div>

                <div className="w-px h-6 bg-zinc-700" />

                <Button
                    variant="secondary"
                    name="Alterar local/data"
                    icon="settings-2"
                />
            </div>
        </div>
    )
}
