import type { RefObject } from "react"
import { useEffect, useRef } from "react"

export const ClickOutsideListener = <T extends HTMLElement>(props: {
    handler: () => void
    children: (ref: RefObject<T>) => JSX.Element
}) => {
    const { children, handler } = props
    const ref = useRef<T>(null)

    useEffect(() => {
        const clickHandler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler()
            }
        }

        window.addEventListener("click", clickHandler)

        return () => {
            window.removeEventListener("click", clickHandler)
        }
    }, [])

    return <>{children(ref)}</>
}
