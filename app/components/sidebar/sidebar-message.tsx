import { useLocation, useNavigate, useOutletContext } from "@remix-run/react"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import { Image, MimeType } from "remix-image"
import type { SupabaseContext } from "~/routes/__main"
import { useLastMessage } from "~/stores"
import type { Room_participants } from "~/types/database"

type Props = {
    data: Room_participants
}

export const SidebarMessage = (props: Props) => {
    const { data } = props
    const location = useLocation()
    const { supabase } = useOutletContext<SupabaseContext>()
    const [lastMessage, setLastMessage] = useState<string>()
    const lastMessageAtom = useAtomValue(useLastMessage)

    const fetch = async () => {
        const { data: lastMessage } = await supabase
            .from("messages")
            .select("content")
            .eq("room_id", data.room_id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()
        setLastMessage(lastMessage?.content)
    }
    useEffect(() => {
        fetch()
    }, [])
    const navigate = useNavigate()

    return (
        <li
            className={`flex cursor-pointer items-center gap-4 transition-colors duration-200 ease-out hover:bg-blue-50 p-3 rounded-xl ${
                location.pathname === `/${data.room_id}` ? "bg-blue-50" : "bg-transparent"
            }`}
            onClick={() => navigate(`${data.room_id}`)}>
            <Image
                src={data.profiles?.avatar}
                alt={data.profiles?.username}
                width={43}
                height={43}
                loading="eager"
                loaderUrl="/api/image"
                options={{
                    contentType: MimeType.WEBP,
                }}
                className="rounded-full"
            />
            <div className="flex flex-col gap-1 overflow-hidden">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {data.profiles?.username}
                </span>
                <span className="text-sm text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
                    {lastMessageAtom.message?.trim().length !== 0 &&
                    data.room_id === lastMessageAtom.room_id
                        ? lastMessageAtom.message
                        : lastMessage}
                </span>
            </div>
        </li>
    )
}
