/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { Icon } from './Icon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    control: Control<any>
    error?: FieldErrors
    icon: keyof typeof dynamicIconImports
}

export function Input({ icon, name, control, error, ...rest }: InputProps) {
    return (
        <div className="">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Icon name={icon} className="size-5 text-zinc-400" />

                <Controller
                    control={control}
                    name={name}
                    render={({ field: { value, onChange, ref } }) => (
                        <input
                            {...rest}
                            value={value}
                            onChange={onChange}
                            ref={ref}
                            className="flex-1 h-10 bg-transparent rounded-md text-lg outline-none placeholder:text-zinc-400 placeholder:text-sm"
                        />
                    )}
                />
            </div>

            {error && error[name] && (
                <span className="pl-2 italic text-sm text-red-400">
                    {error[name]?.message as string}
                </span>
            )}
        </div>
    )
}
