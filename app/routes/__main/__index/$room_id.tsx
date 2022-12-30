import { useOutletContext, useParams } from "@remix-run/react"
import { useSetAtom } from "jotai"
import type { KeyboardEvent } from "react"
import { useEffect, useRef, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { Image } from "remix-image"
import { RoomHeader } from "~/components"
import type { SupabaseContext } from "~/routes/__main"
import { useLastMessage } from "~/stores"
import type { Messages, Room_participants } from "~/types/database"

const Room = () => {
    const params = useParams()
    const { room_participants, session, supabase } = useOutletContext<
        SupabaseContext & {
            room_participants: Room_participants[]
            messages: Messages[]
        }
    >()
    const [messages, setMessages] = useState<Messages[] | null>(null)
    const fetchMessage = async () => {
        const { data: messages } = await supabase
            .from("messages")
            .select("*, profiles(*)")
            .eq("room_id", params.room_id)
        setMessages(messages as Messages[])
    }
    useEffect(() => {
        fetchMessage()
    }, [params.room_id])
    const roomFriendProfile = room_participants.filter((room) => room.room_id === params.room_id)
    const setLastMessage = useSetAtom(useLastMessage)

    useEffect(() => {
        const messageChannel = supabase
            .channel("public:messages")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                },
                async (payload) => {
                    if (messages !== null) setMessages([...messages, payload.new as Messages])
                    setLastMessage({
                        message: payload.new.content,
                        room_id: params.room_id,
                    })
                }
            )
            .subscribe()

        return () => {
            messageChannel.unsubscribe()
        }
    }, [messages])

    const chatRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        chatRef.current?.scrollIntoView()
    }, [messages])

    const [message, setMessage] = useState("")
    const handleSendMessage = async () => {
        if (message.trim().length !== 0)
            await supabase.from("messages").insert({
                content: message,
                room_id: params.room_id!,
                profile_id: session?.user.id,
            })
        setMessage("")
    }
    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="relative h-full">
            <RoomHeader data={roomFriendProfile[0]?.profiles} />
            <main className="flex flex-col px-4 h-[calc(100vh-72px*2-12px)] pb-2">
                <div className="flex flex-col-reverse h-full scrollbar scrollbar-rounded scroll-smooth pr-2">
                    <div className="flex flex-col gap-2">
                        {messages?.map((data) => (
                            <p
                                ref={chatRef}
                                key={data.id}
                                className={`w-fit rounded-t-xl whitespace-pre-line ${
                                    data.profile_id === session?.user.id
                                        ? "p-3 bg-slate-600 text-white self-end rounded-l-2xl"
                                        : "p-3 bg-blue-50 rounded-r-2xl"
                                }`}>
                                {data.content}
                            </p>
                        ))}
                    </div>
                </div>
            </main>
            <div className="absolute bottom-0 w-full p-4">
                <div className="flex gap-2 md:gap-0">
                    <ReactTextareaAutosize
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="input bg-blue-50 border-none focus:ring-blue-500 px-4.5 resize-none md:scrollbar md:scrollbar-rounded md:scroll-smooth overflow-hidden md:hover:overflow-auto"
                        rows={1}
                        maxRows={4}
                    />
                    <button
                        className="bg-blue-500 px-3 rounded-lg h-2.5rem self-end block md:hidden"
                        onClick={handleSendMessage}>
                        <Image
                            src="/navigation-pointer.svg"
                            alt="Send message"
                            height={18}
                            width={18}
                            loading="lazy"
                            placeholder="blur"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Room
