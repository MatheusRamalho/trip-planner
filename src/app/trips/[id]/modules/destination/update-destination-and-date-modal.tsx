/* eslint-disable camelcase */
import { FormEvent, useState } from 'react'
import { DateRange, DayPicker } from 'react-day-picker'
import { format } from 'date-fns'

import 'react-day-picker/dist/style.css'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Icon } from '@/components/Icon'

interface UpdateDestinationAndDateTripModalProps {
    closeUpdateTripModal: () => void
    eventStartAndEndDate: DateRange | undefined
    setEventStartAndEndDate: (dates: DateRange | undefined) => void
    setDestination: (destination: string) => void
    updateTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function UpdateDestinationAndDateTripModal({
    closeUpdateTripModal,
    eventStartAndEndDate,
    setEventStartAndEndDate,
    setDestination,
    updateTrip,
}: UpdateDestinationAndDateTripModalProps) {
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
        <Dialog
            title="Atualizar destino"
            description="Atualizar destino da viagem."
            onClose={closeUpdateTripModal}
        >
            <form onSubmit={updateTrip} className="space-y-3">
                <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <Icon name="map-pin" className="size-5 text-zinc-400" />

                    <input
                        className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        type="text"
                        placeholder="Para onde você vai?"
                        onChange={(event) => setDestination(event.target.value)}
                    />
                </div>

                <button
                    className="flex-1 w-full h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
                    onClick={openDatePicker}
                >
                    <Icon name="calendar" className="size-5 text-zinc-400" />

                    <span className="w-40 text-zinc-400 text-sm">
                        {displayedDate || 'Quando?'}
                    </span>
                </button>

                <Button
                    name="Atualizar destino"
                    type="submit"
                    className="w-full"
                />
            </form>

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
        </Dialog>
    )
}
