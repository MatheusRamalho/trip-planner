import { ReactNode } from 'react'
import { Icon } from './Icon'

interface DialogProps {
    title: string
    description: string
    onClose: () => void
    children: ReactNode
}

export function Dialog({ title, description, onClose, children }: DialogProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 shadow-shape space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-lg font-semibold">{title}</h2>

                        <button type="button" onClick={onClose}>
                            <Icon name="x" className="size-5 text-zinc-400" />
                        </button>
                    </div>

                    <p className="text-zinc-400 text-sm text-left">
                        {description}
                    </p>
                </div>

                {children}
            </div>
        </div>
    )
}
