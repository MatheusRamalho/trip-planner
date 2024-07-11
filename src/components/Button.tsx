import { ButtonHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { Icon } from '@/components/Icon'

const buttonVariants = tv({
    slots: {
        bContainer: [
            'cursor-pointer h-11 px-5 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ',
        ],
        bIcon: 'size-5',
    },
    variants: {
        variant: {
            primary: {
                bContainer: ['bg-lime-300 text-lime-950 hover:bg-lime-400'],
                bIcon: 'text-lime-950',
            },
            secondary: {
                bContainer: ['bg-zinc-800 text-zinc-200 hover:bg-zinc-700'],
                bIcon: '',
            },
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    name: string
    icon?: keyof typeof dynamicIconImports
    className?: string
}

export function Button({
    name,
    icon,
    variant,
    className,
    ...rest
}: ButtonProps) {
    const { bContainer, bIcon } = buttonVariants({ variant })

    return (
        <button className={twMerge(bContainer(), className)} {...rest}>
            {name}

            {icon && <Icon name={icon} className={bIcon()} />}
        </button>
    )
}
