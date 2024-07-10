'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'

import { ImportantLinks } from './modules/important-links'
import { Activities } from './modules/activities'
import { DestinationAndDateHeader } from './modules/destination-and-date-header'
import { Guests } from './modules/guests'
import { CreateAcitvityModal } from './modules/create-activity-modal'

export default function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
        useState<boolean>(false)

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-3xl font-semibold"> Atividades </h2>

                        <Button
                            name="Cadastrar atividade"
                            icon="plus"
                            onClick={openCreateActivityModal}
                        />
                    </div>

                    <Activities />
                </div>

                <div className="w-80 space-y-6">
                    <ImportantLinks />

                    <div className="w-full h-px bg-zinc-800" />

                    <div className="">
                        <Guests />
                    </div>
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateAcitvityModal onClose={closeCreateActivityModal} />
            )}
        </div>
    )
}
