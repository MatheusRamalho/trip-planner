import { Icon } from './Icon'

interface GuestPresenceProps {
    name: string
    email: string
}

export function GuestPresence({ name, email }: GuestPresenceProps) {
    return (
        <div className="flex items-center justify-between gap-4 group">
            <div className="flex-1 space-y-1.5">
                <span className="block font-medium text-zinc-100">{name}</span>

                <span className="block text-sm text-zinc-400 truncate">
                    {email}
                </span>
            </div>

            <Icon name="circle-dashed" className="size-5 text-zinc-400" />
        </div>
    )
}
