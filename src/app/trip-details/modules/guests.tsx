import { Button } from '@/components/Button'
import { GuestPresence } from '@/components/GuestPresence'

export function Guests() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl"> Convidados </h2>

            <div className="space-y-5">
                <GuestPresence name="Vívian 01" email="teste@email.com" />
                <GuestPresence name="Vívian 02" email="teste@email.com" />
            </div>

            <Button
                variant="secondary"
                name="Gerenciar convidados"
                icon="user-cog"
                className="w-full"
            />
        </div>
    )
}
