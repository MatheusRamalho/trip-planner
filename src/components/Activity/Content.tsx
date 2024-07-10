import { ReactNode } from 'react'

interface ActivityContentProps {
    children: ReactNode
}

export function ActivityContent({ children }: ActivityContentProps) {
    return <div className="space-y-2.5"> {children} </div>
}
