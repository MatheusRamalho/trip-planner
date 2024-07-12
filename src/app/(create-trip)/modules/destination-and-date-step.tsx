import { useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { format } from 'date-fns'

import 'react-day-picker/dist/style.css'

import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { Dialog } from '@/components/Dialog'
import { Divider } from '@/components/Divider'

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    eventStartAndEndDate: DateRange | undefined
    openGuestInput: () => void
    closeGuestInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndEndDate: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    eventStartAndEndDate,
    openGuestInput,
    closeGuestInput,
    setDestination,
    setEventStartAndEndDate,
}: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePicketOpen] = useState<boolean>(false)

    function openDatePicker() {
        setIsDatePicketOpen(true)
    }

    function closeDatePicker() {
        setIsDatePicketOpen(false)
    }

    const displayedDate =
        eventStartAndEndDate &&
        eventStartAndEndDate.from &&
        eventStartAndEndDate.to
            ? format(eventStartAndEndDate.from, "d ' de 'LLL")
                  .concat(' até ')
                  .concat(format(eventStartAndEndDate.to, "d ' de 'LLL"))
            : null

    return (
        <div className="w-72 h-auto mx-auto p-4 sm:w-full sm:h-16 sm:py-0 bg-zinc-900 rounded-xl flex items-center gap-3 flex-col sm:flex-row shadow-shape">
            <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                <Icon name="map-pin" className="size-5 text-zinc-400" />

                <input
                    className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                    type="text"
                    placeholder="Para onde você vai?"
                    disabled={isGuestsInputOpen}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <button
                className="flex items-center gap-2 text-left flex-1 py-3 sm:flex-none w-full sm:w-auto"
                disabled={isGuestsInputOpen}
                onClick={openDatePicker}
            >
                <Icon name="calendar" className="size-5 text-zinc-400" />

                <span className="w-40 text-zinc-400 text-sm">
                    {displayedDate || 'Quando?'}
                </span>
            </button>

            <Divider variant="vertical" />

            {isGuestsInputOpen ? (
                <Button
                    variant="secondary"
                    name="Alterar local/data"
                    icon="settings-2"
                    onClick={closeGuestInput}
                    className="w-full sm:w-fit"
                />
            ) : (
                <Button
                    name="Continuar"
                    icon="arrow-right"
                    onClick={openGuestInput}
                    className="w-full sm:w-fit"
                />
            )}

            {isDatePickerOpen && (
                <Dialog
                    size="small"
                    title="Selecione a data"
                    description=""
                    onClose={closeDatePicker}
                >
                    <DayPicker
                        mode="range"
                        selected={eventStartAndEndDate}
                        onSelect={setEventStartAndEndDate}
                    />
                </Dialog>
            )}
        </div>
    )
}
