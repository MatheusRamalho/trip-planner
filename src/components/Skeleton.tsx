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
            className={twMerge('animate-pulse bg-zinc-800 rounded', className)}
        >
            {children}
        </div>
    )
}
