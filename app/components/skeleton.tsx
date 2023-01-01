import type { HTMLProps } from "react"

export const Skeleton = ({ className, ...rest }: HTMLProps<HTMLDivElement>) => {
    return (
        <div
            className={`animate-pulse bg-slate-300 rounded-md w-full ${className}`}
            {...rest}></div>
    )
}
