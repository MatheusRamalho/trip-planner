'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DateRange } from 'react-day-picker'
import { useMutation } from '@tanstack/react-query'

import { createNewTrip } from '@/api/create-new-trip'
import { Logo } from '@/components/Logo'
import { Toast } from '@/components/Toast'

import { InviteGuestsModal } from './modules/invite-guests-modal'
import { ConfirmTripModal } from './modules/confirm-trip-modal'
import { DestinationAndDateStep } from './modules/destination-and-date-step'
import { InviteGuestsStep } from './modules/invite-guests-step'

export default function CreateTripPage() {
    const router = useRouter()

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState<boolean>(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState<boolean>(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] =
        useState<boolean>(false)

    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
        DateRange | undefined
    >()
    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

    const {
        mutateAsync: mutationCreateNewTrip,
        isSuccess: isSuccessCreateNewTrip,
        isError: isErrorCreateNewTrip,
    } = useMutation({
        mutationFn: createNewTrip,
        onSuccess: (data) => {
            setTimeout(() => {
                router.push(`/trips/${data.tripId}`)
            }, 10000)
        },
        onError: (error) => {
            console.error(error)
        },
    })

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

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailsToInvite([...emailsToInvite, email])

        event.currentTarget.reset()
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(
            (email) => email !== emailToRemove,
        )

        setEmailsToInvite(newEmailList)
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!destination) {
            return
        }

        if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) {
            return
        }

        if (emailsToInvite.length === 0) {
            return
        }

        if (!ownerName || !ownerEmail) {
            return
        }

        try {
            await mutationCreateNewTrip({
                destination,
                starts_at: eventStartAndEndDate.from,
                ends_at: eventStartAndEndDate.to,
                emails_to_invite: emailsToInvite,
                owner_name: ownerName,
                owner_email: ownerEmail,
            })
        } catch (error) {
            console.error(error)
        } finally {
            closeConfirmTripModal()
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            {isSuccessCreateNewTrip && (
                <Toast
                    isVisible
                    type="success"
                    message="Viagem criada com sucesso!"
                />
            )}

            {isErrorCreateNewTrip && (
                <Toast isVisible type="error" message="Erro ao criar viagem!" />
            )}

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
                        setDestination={setDestination}
                        eventStartAndEndDate={eventStartAndEndDate}
                        setEventStartAndEndDate={setEventStartAndEndDate}
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
                        emailsToInvite={emailsToInvite}
                        addNewEmailToInvite={addNewEmailToInvite}
                        removeEmailFromInvites={removeEmailFromInvites}
                        closeGuestModal={closeGuestModal}
                    />
                )}

                {isConfirmTripModalOpen && (
                    <ConfirmTripModal
                        createTrip={createTrip}
                        closeConfirmTripModal={closeConfirmTripModal}
                        setOwnerName={setOwnerName}
                        setOwnerEmail={setOwnerEmail}
                    />
                )}
            </div>
        </div>
    )
}
