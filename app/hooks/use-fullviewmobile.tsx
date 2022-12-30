import { useEffect, useState } from "react"

const measureHeight = (): number | null => {
    if (!isClient()) return null
    return window.innerHeight
}

const useWasRenderedOnClientAtLeastOnce = () => {
    const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] = useState(false)

    useEffect(() => {
        if (isClient()) {
            setWasRenderedOnClientAtLeastOnce(true)
        }
    }, [])
    return wasRenderedOnClientAtLeastOnce
}

const isClient = () => {
    return typeof window !== "undefined" && typeof document !== "undefined"
}

export const useFullViewMobile = (): number | null => {
    const [height, setHeight] = useState<number | null>(measureHeight)

    const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce()

    useEffect(() => {
        if (!wasRenderedOnClientAtLeastOnce) return

        const setMeasuredHeight = () => {
            const measuredHeight = measureHeight()
            setHeight(measuredHeight)
        }

        window.addEventListener("resize", setMeasuredHeight)
        return () => window.removeEventListener("resize", setMeasuredHeight)
    }, [wasRenderedOnClientAtLeastOnce])
    return wasRenderedOnClientAtLeastOnce ? height : null
}
