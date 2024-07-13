'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'

import { DestinationAndDateHeader } from './modules/destination/destination-and-date-header'
import { ImportantLinks } from './modules/link/important-links'
import { CreateLinkModal } from './modules/link/create-importante-link-modal'
import { Activities } from './modules/activity/activities'
import { CreateAcitvityModal } from './modules/activity/create-activity-modal'
import { Guests } from './modules/participant/guests'
import { CreateGuestModal } from './modules/participant/create-guest-modal'

export default function TripDetailsPage({
    params,
}: {
    params: { id: string }
}) {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
        useState<boolean>(false)
    const [isCreateImportantLinkModalOpen, setIsCreateImportantLinkModalOpen] =
        useState<boolean>(false)
    const [isCreateGuestkModalOpen, setIsCreateGuestkModalOpen] =
        useState<boolean>(false)

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }

    function openCreateImportantLinkModal() {
        setIsCreateImportantLinkModalOpen(true)
    }

    function closeCreateImportantLinkModal() {
        setIsCreateImportantLinkModalOpen(false)
    }

    function openCreateGuestModal() {
        setIsCreateGuestkModalOpen(true)
    }

    function closeCreateGuestModal() {
        setIsCreateGuestkModalOpen(false)
    }

    return (
        <div className="max-w-6xl px-2 lg:px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader tripId={params.id} />

            <main className="flex gap-16 px-4 flex-col lg:flex-row">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between gap-2 flex-col lg:flex-row">
                        <div className="flex-1 w-full lg:w-auto">
                            <h2 className=" text-3xl font-semibold">
                                Atividades
                            </h2>
                        </div>

                        <Button
                            name="Cadastrar atividade"
                            icon="plus"
                            onClick={openCreateActivityModal}
                            className="w-full lg:w-fit"
                        />
                    </div>

                    <Activities tripId={params.id} />
                </div>

                <div className="lg:hidden w-full h-px bg-zinc-800" />

                <div className="w-full lg:w-80 space-y-6">
                    <ImportantLinks
                        tripId={params.id}
                        openCreateImportantLinkModal={
                            openCreateImportantLinkModal
                        }
                    />

                    <div className="w-full h-px bg-zinc-800" />

                    <div className="">
                        <Guests
                            tripId={params.id}
                            openCreateGuestModal={openCreateGuestModal}
                        />
                    </div>
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateAcitvityModal
                    tripId={params.id}
                    closeActivityModal={closeCreateActivityModal}
                />
            )}

            {isCreateImportantLinkModalOpen && (
                <CreateLinkModal
                    tripId={params.id}
                    closeCreateImportantLinkModal={
                        closeCreateImportantLinkModal
                    }
                />
            )}

            {isCreateGuestkModalOpen && (
                <CreateGuestModal
                    tripId={params.id}
                    closeCreateGuestModal={closeCreateGuestModal}
                />
            )}
        </div>
    )
}
