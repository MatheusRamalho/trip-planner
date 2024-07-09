import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface SkeletonProps {
    className: string
    children?: ReactNode
}

export function Skeleton({ className, children }: SkeletonProps) {
    return (
        <div
            data-testid="skeleton"
            className={twMerge(
                'bg-neutral-l-200 dark:bg-neutral-d-200 animate-pulse',
                className,
            )}
        >
            {children}
        </div>
    )
}
