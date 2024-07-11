import { Icon } from '@/components/Icon'

interface ActivityItemProps {
    name: string
    hour: string
}

export function ActivityItem({ name, hour }: ActivityItemProps) {
    return (
        <div className="px-4 py-3 bg-zinc-900 rounded-lg shadow-shape flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1">
                <Icon name="circle-check" className="size-5 text-lime-300" />
                <span className="text-base text-zinc-100"> {name} </span>
            </div>

            <span className="text-sm text-zinc-400"> {hour} </span>
        </div>
    )
}
