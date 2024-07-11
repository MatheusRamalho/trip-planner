import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/Button'

export function ImportantLinks() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl"> Links importantes </h2>

            <div className="space-y-5">
                <Anchor
                    name="Reserva AIRBNB"
                    link="http://www.airbnb.com/dfndsjhkvfdvdfknvjkdnvjfdjvjdnvjkdfnjvndfjvndjkfnvkjdfn"
                />

                <Anchor
                    name="Reserva AIRBNB"
                    link="http://www.airbnb.com/dfndsjhkvfdvdfknvjkdnvjfdjvjdnvjkdfnjvndfjvndjkfnvkjdfn"
                />
            </div>

            <Button
                variant="secondary"
                name="Cadastrar novo link"
                icon="plus"
                className="w-full"
            />
        </div>
    )
}
