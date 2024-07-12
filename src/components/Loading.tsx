export function Loading() {
    return (
        <div className="z-20 fixed inset-0 bg-black/60 flex items-center justify-center">
            <div
                className="size-14 bg-lime-400 rounded-full border-l-8 border-lime-600 animate-spin"
                aria-label="'Carregando...'"
            />
        </div>
    )
}
