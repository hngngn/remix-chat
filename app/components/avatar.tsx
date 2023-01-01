import { useAtomValue } from "jotai"
import { forwardRef } from "react"
import type { ImageProps } from "remix-image"
import { Image, MimeType } from "remix-image"
import { useOnline } from "~/stores"
import { Indicator } from "./indicator"

type Props = {
    profile_id: string | undefined
}

export const Avatar = forwardRef<HTMLDivElement, ImageProps & Props>((props, ref) => {
    const { profile_id } = props
    const isOnline = useAtomValue(useOnline)
    const match = isOnline?.filter((data) => data.profile_id === profile_id)

    return (
        <div className="relative" ref={ref}>
            {match?.length === 0 ? null : <Indicator />}
            <Image
                width={43}
                height={43}
                loading="eager"
                loaderUrl="/api/image"
                options={{
                    contentType: MimeType.WEBP,
                }}
                className="rounded-full"
                {...props}
            />
        </div>
    )
})

Avatar.displayName = "Avatar"
