import { ReactNode } from 'react'

interface ActivityRootProps {
    dayOfMonth: number
    dayOfTheWeek: string
    children?: ReactNode
}

export function ActivityRoot({
    dayOfMonth,
    dayOfTheWeek,
    children,
}: ActivityRootProps) {
    return (
        <div className="space-y-2.5">
            <div className="flex items-baseline gap-2">
                <span className="text-xl text-zinc-300 font-semibold">
                    Dia {dayOfMonth}
                </span>

                <span className="text-xs text-zinc-500">{dayOfTheWeek}</span>
            </div>

            {children || (
                <p className="text-sm text-zinc-500">
                    {' '}
                    Nenhuma atividade cadastrada nessa data.
                </p>
            )}
        </div>
    )
}
