import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Planejador de viagem',
    description: 'Planejador de viagem',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-Br">
            <body
                className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased`}
            >
                <div className=""> {children} </div>
            </body>
        </html>
    )
}
