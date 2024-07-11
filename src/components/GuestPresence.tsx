import { Icon } from '@/components/Icon'

interface GuestPresenceProps {
    name: string
    email: string
    isConfirmed: boolean
}

export function GuestPresence({
    name,
    email,
    isConfirmed = false,
}: GuestPresenceProps) {
    return (
        <div className="flex items-center justify-between gap-4 group">
            <div className="flex-1 space-y-1.5">
                <span className="block font-medium text-zinc-100">{name}</span>

                <span className="block text-sm text-zinc-400 truncate">
                    {email}
                </span>
            </div>

            {isConfirmed ? (
                <Icon name="circle-check" className="size-5 text-green-400" />
            ) : (
                <Icon name="circle-dashed" className="size-5 text-zinc-400" />
            )}
        </div>
    )
}
