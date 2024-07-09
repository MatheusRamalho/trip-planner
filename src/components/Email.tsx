import { Icon } from '@/components/Icon'

interface EmailsProps {
    email: string
    onClick: () => void
}

export function Email({ email, onClick }: EmailsProps) {
    return (
        <div className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
            <span className="text-zinc-300"> {email} </span>

            <button type="button" onClick={onClick}>
                <Icon name="x" className="size-4 text-zinc-400" />
            </button>
        </div>
    )
}
