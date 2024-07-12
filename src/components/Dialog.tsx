import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { Icon } from '@/components/Icon'

const dialogVariants = tv({
    base: 'rounded-xl py-5 px-6 bg-zinc-900 shadow-shape space-y-5',
    variants: {
        size: {
            default: 'w-[640px]',
            small: 'w-fit',
        },
    },
    defaultVariants: {
        size: 'default',
    },
})

interface DialogProps extends VariantProps<typeof dialogVariants> {
    title: string
    description: string
    onClose: () => void
    children: ReactNode
}

export function Dialog({
    title,
    description,
    onClose,
    children,
    size,
    ...props
}: DialogProps) {
    return (
        <div className="z-10 fixed inset-0 size-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className={dialogVariants({ size })} {...props}>
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-lg font-semibold">{title}</h2>

                        <button
                            type="button"
                            onClick={onClose}
                            className="group"
                        >
                            <Icon
                                name="x"
                                className="size-5 text-zinc-400 group-hover:text-zinc-100"
                            />
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
