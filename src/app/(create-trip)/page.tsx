'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Logo } from '@/components/Logo'

import { InviteGuestsModal } from './modules/invite-guests-modal'
import { ConfirmTripModal } from './modules/confirm-trip-modal'
import { DestinationAndDateStep } from './modules/destination-and-date-step'
import { InviteGuestsStep } from './modules/invite-guests-step'

export default function CreateTripPage() {
    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false)
    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] =
        useState<boolean>(false)

    function openGuestInput() {
        setIsGuestsInputOpen(true)
    }

    function closeGuestInput() {
        setIsGuestsInputOpen(false)
    }

    function openGuestModal() {
        setIsGuestsModalOpen(true)
    }

    function closeGuestModal() {
        setIsGuestsModalOpen(false)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center justify-center gap-3">
                    <Logo />

                    <p className="text-zinc-300 text-lg">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        isGuestsInputOpen={isGuestsInputOpen}
                        openGuestInput={openGuestInput}
                        closeGuestInput={closeGuestInput}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep
                            emailsToInvite={emailsToInvite}
                            openGuestModal={openGuestModal}
                            openConfirmTripModal={openConfirmTripModal}
                        />
                    )}
                </div>

                <p className="text-zinc-500 text-sm">
                    Ao planejar sua viagem pela plann.er você automaticamente
                    concorda <br />
                    com nossos{' '}
                    <Link href="#" className="text-zinc-300 underline">
                        termos de uso
                    </Link>
                    e
                    <Link href="#" className="text-zinc-300 underline">
                        políticas de privacidade.
                    </Link>
                </p>

                {isGuestsModalOpen && (
                    <InviteGuestsModal
                        guests={emailsToInvite}
                        setGuests={setEmailsToInvite}
                        onClose={closeGuestModal}
                    />
                )}

                {isConfirmTripModalOpen && (
                    <ConfirmTripModal onClose={closeConfirmTripModal} />
                )}
            </div>
        </div>
    )
}
