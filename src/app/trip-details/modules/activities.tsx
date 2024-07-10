import { Activity } from '@/components/Activity'

export function Activities() {
    return (
        <div className="space-y-8">
            <Activity.Root dayOfMonth={17} dayOfTheWeek="Sábado" />

            <Activity.Root dayOfMonth={18} dayOfTheWeek="Domingo">
                <Activity.Content>
                    <Activity.Item name="Corrida de Kart" hour="14:00h" />

                    <Activity.Item name="Corrida a pé" hour="17:00h" />
                </Activity.Content>
            </Activity.Root>

            <Activity.Root dayOfMonth={19} dayOfTheWeek="Segunda">
                <Activity.Content>
                    <Activity.Item name="Corrida de Kart" hour="14:00h" />

                    <Activity.Item name="Corrida a pé" hour="17:00h" />

                    <Activity.Item name="Corrida a pé" hour="17:00h" />

                    <Activity.Item name="Corrida a pé" hour="17:00h" />
                    <Activity.Item name="Corrida a pé" hour="17:00h" />
                </Activity.Content>
            </Activity.Root>
        </div>
    )
}
