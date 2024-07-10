import Link from 'next/link'
import { Icon } from './Icon'

interface AnchorProps {
    name: string
    link: string
}

export function Anchor({ name, link }: AnchorProps) {
    return (
        <Link
            className="flex items-center justify-between gap-4 group hover:cursor-pointer"
            href={link}
            target="_blank"
        >
            <div className="flex-1 space-y-1.5">
                <span className="block font-medium text-zinc-100">{name}</span>

                <span className="block text-xs text-zinc-400 truncate group-hover:text-zinc-200">
                    {link}
                </span>
            </div>

            <Icon name="link-2" className="size-5 text-zinc-400" />
        </Link>
    )
}
