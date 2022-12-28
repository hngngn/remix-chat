import { useLocation, useNavigate } from "@remix-run/react"
import type { Room_participants } from "~/types/database"

type Props = {
    data: Room_participants
}

export const SidebarMessage = (props: Props) => {
    const { data } = props
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <li
            className={`flex cursor-pointer items-center gap-4 transition-colors duration-200 ease-out hover:bg-blue-50 p-3 rounded-xl ${
                location.pathname === data.room_id ? "bg-slate-100" : "bg-transparent"
            }`}
            onClick={() => navigate(`${data.room_id}`)}>
            <img
                src={data.profiles?.avatar}
                alt={data.profiles?.username}
                width={43}
                height={43}
                loading="lazy"
                placeholder="blur"
                className="rounded-full"
            />
            <div className="flex flex-col gap-1 overflow-hidden">
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {data.profiles?.username}
                </span>
                <span className="text-sm text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
                    {data.last_message || "Start chatting!"}
                </span>
            </div>
        </li>
    )
}
