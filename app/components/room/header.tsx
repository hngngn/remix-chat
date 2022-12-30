import { useNavigate } from "@remix-run/react"
import { Image } from "remix-image"
import type { Profiles } from "~/types/database"

type Props = {
    data: Profiles | undefined
}

export const RoomHeader = (props: Props) => {
    const { data } = props
    const navigate = useNavigate()

    return (
        <div className="sticky p-4 border-b">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <button
                        className="p-2 bg-blue-50 rounded-xl block md:hidden"
                        onClick={() => navigate("/", { replace: true })}>
                        <Image src="/chevron-left.svg" alt="Back to home" width={18} height={18} />
                    </button>
                    <div className="flex justify-center items-center gap-3">
                        <Image
                            src={data?.avatar}
                            alt={data?.username}
                            height={40}
                            width={40}
                            loading="lazy"
                            placeholder="blur"
                            className="rounded-full"
                        />
                        <span>{data?.username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
