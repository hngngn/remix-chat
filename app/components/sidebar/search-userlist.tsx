import { Image } from "remix-image"
import type { Profiles } from "~/types/database"

type Props = {
    data: Profiles
    createRoomHandle: (id: string) => void
}

export const SearchUserList = (props: Props) => {
    const { createRoomHandle, data } = props

    return (
        <li
            className="flex cursor-pointer items-center gap-4 transition-colors duration-200 ease-out hover:bg-blue-50 p-3 rounded-xl"
            onClick={() => createRoomHandle(data.id)}>
            <Image
                src={data.avatar}
                alt={data.username}
                loading="lazy"
                placeholder="blur"
                width={36}
                height={36}
                className="rounded-full"
            />
            <span className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                {data.username}
            </span>
        </li>
    )
}
