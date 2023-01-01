import { useNavigate } from "@remix-run/react"
import { Image, MimeType } from "remix-image"
import type { Profiles } from "~/types/database"
import { Avatar } from "../avatar"

type Props = {
    data: Profiles | undefined
}

export const RoomHeader = (props: Props) => {
    const { data } = props
    const navigate = useNavigate()

    return (
        <div className="sticky p-4 border-b">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <button
                        className="p-2 h-fit bg-slate-100 rounded-xl block md:hidden"
                        onClick={() => navigate("/", { replace: true })}>
                        <Image
                            src="/chevron-left.svg"
                            alt="Back to home"
                            loading="eager"
                            loaderUrl="/api/image"
                            options={{
                                contentType: MimeType.WEBP,
                            }}
                            width={18}
                            height={18}
                        />
                    </button>
                    <div className="flex justify-center items-center gap-3">
                        <Avatar
                            src={data?.avatar}
                            alt={data?.username}
                            width={40}
                            height={40}
                            profile_id={data?.id}
                        />
                        <span>{data?.username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
