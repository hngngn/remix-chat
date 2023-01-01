import { useLocation, useNavigate, useOutletContext, useParams } from "@remix-run/react"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"
import ReactTimeAgo from "react-time-ago"
import type { SupabaseContext } from "~/routes/__main"
import { useLastMessage } from "~/stores"
import type { Messages, Room_participants } from "~/types/database"
import { Avatar } from "../avatar"
import { Skeleton } from "../skeleton"

type Props = {
    data: Room_participants
}

export const SidebarMessage = (props: Props) => {
    const { data } = props
    const location = useLocation()
    const { supabase, session } = useOutletContext<SupabaseContext>()
    const [lastMessage, setLastMessage] = useState<Messages | null>(null)
    const [newJoin, setNewJoin] = useState<string | null>(null)
    const messageAtom = useAtomValue(useLastMessage)
    const param = useParams()

    const fetch = async () => {
        const { data: lastMessage } = await supabase
            .from("messages")
            .select("*")
            .eq("room_id", data.room_id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single()
        if (lastMessage === null) {
            setNewJoin("Start chatting now!")
            setLastMessage(null)
        } else {
            setNewJoin(null)
            setLastMessage({
                ...(lastMessage as Messages),
            })
        }
    }
    useEffect(() => {
        fetch()
    }, [param.room_id])
    const navigate = useNavigate()

    return (
        <li
            className={`flex cursor-pointer items-center gap-4 transition-colors duration-200 ease-out hover:bg-slate-100 p-3 rounded-xl ${
                location.pathname === `/${data.room_id}` ? "bg-slate-100" : "bg-transparent"
            }`}
            onClick={() => navigate(`${data.room_id}`)}>
            <Avatar
                src={data.profiles?.avatar}
                alt={data.profiles?.username}
                profile_id={data.profile_id}
            />
            <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {data.profiles?.username}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                    {lastMessage !== null || messageAtom !== null ? (
                        <>
                            <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                                {`${
                                    data.room_id === messageAtom?.room_id
                                        ? session?.user.id === messageAtom?.profile_id
                                            ? "You"
                                            : data.profiles?.username.split(" ")[0]
                                        : session?.user.id === lastMessage?.profile_id
                                        ? "You"
                                        : data.profiles?.username.split(" ")[0]
                                }: ${
                                    data.room_id === messageAtom?.room_id
                                        ? messageAtom?.content
                                        : lastMessage?.content
                                }`}
                            </span>
                            <ReactTimeAgo
                                className="ml-2"
                                date={
                                    data.room_id === messageAtom?.room_id
                                        ? Date.parse(messageAtom?.created_at!)
                                        : Date.parse(lastMessage?.created_at!)
                                }
                                timeStyle="twitter-minute-now"
                            />
                        </>
                    ) : newJoin !== null ? (
                        <span>{newJoin}</span>
                    ) : (
                        <Skeleton className="h-.8rem" />
                    )}
                </div>
            </div>
        </li>
    )
}
