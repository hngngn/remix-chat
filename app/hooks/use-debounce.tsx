import { useEffect, useState } from "react"

export const useDebounce = <T,>(value: T, wait?: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), wait || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, wait])

    return debouncedValue
}
