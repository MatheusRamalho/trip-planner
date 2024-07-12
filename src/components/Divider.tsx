import { twMerge } from 'tailwind-merge'
import { tv, VariantProps } from 'tailwind-variants'

const dividerVariants = tv({
    base: 'bg-zinc-700',
    variants: {
        variant: {
            horizontal: 'w-6 h-px',
            vertical: 'w-6 h-px sm:w-px sm:h-6',
        },
    },
    defaultVariants: {
        variant: 'horizontal',
    },
})

interface DividerProps extends VariantProps<typeof dividerVariants> {
    className?: string
}

export function Divider({ className, variant }: DividerProps) {
    return <div className={twMerge(dividerVariants({ variant }), className)} />
}
