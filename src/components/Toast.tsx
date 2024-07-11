import { useEffect, useState } from 'react'

import { Icon } from '@/components/Icon'

interface ToastProps {
    isVisible: boolean
    type?: 'success' | 'error' | 'info'
    message: string
}

export function Toast({
    isVisible = false,
    type = 'info',
    message,
    ...rest
}: ToastProps) {
    const [visible, setVisible] = useState<boolean>(isVisible)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 10000)

        return () => clearTimeout(timer)
    }, [])

    return (
        visible && (
            <div
                className="z-50 fixed top-4 right-4 w-64 p-4 bg-zinc-800 rounded-lg shadow-shape"
                {...rest}
            >
                <div className="flex items-start gap-2">
                    {type === 'success' && (
                        <Icon name="check" className="size-5 text-lime-500" />
                    )}

                    {type === 'error' && (
                        <Icon name="bug" className="size-5 text-red-500" />
                    )}

                    {type === 'info' && (
                        <Icon name="info" className="size-5 text-zinc-200" />
                    )}

                    <span className="flex-1 text-sm text-zinc-400">
                        {message}
                    </span>
                </div>
            </div>
        )
    )
}
