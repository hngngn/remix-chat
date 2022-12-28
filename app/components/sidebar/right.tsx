import { useFetcher, useNavigate, useOutletContext } from "@remix-run/react"
import type { RefObject } from "react"
import { useEffect, useState } from "react"
import { useDebounce } from "~/hooks"
import type { TypedSupabaseClient } from "~/routes/__main"
import type { Profiles, Room_participants } from "~/types/database"
import { ClickOutsideListener } from "../click-outside"
import { SearchUserList } from "./search-userlist"
import { SidebarMessage } from "./sidebar-message"

type Props = {
    room_participants: Room_participants[]
}

export const SidebarRight = (props: Props) => {
    const { room_participants } = props

    const [search, setSearch] = useState("")
    const debouncedValue = useDebounce<string>(search)
    const { supabase } = useOutletContext<{ supabase: TypedSupabaseClient }>()
    const [searchData, setSearchData] = useState<Profiles[] | null>(null)
    const [isFocused, setIsFocused] = useState(false)
    const searchHandle = async () => {
        const { data } = await supabase.rpc("search_profile", {
            name: debouncedValue,
        })
        setSearchData(data as Profiles[])
    }
    useEffect(() => {
        searchHandle()
    }, [debouncedValue])
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const createRoomHandler = async (id: string) => {
        const { data } = await supabase.rpc("create_new_room", {
            other_user_id: id,
        })
        fetcher.submit(null, {
            method: "post",
            action: "/handle-auth",
        })
        navigate(`${data}`)
    }

    return (
        <div className="mi-w-[calc(100vh-80px)] md:w-[20em] p-4 pt-[1.35rem] flex flex-col border-r">
            <div className="flex justify-between">
                <h1 className="text-2xl font-600">Message</h1>
            </div>
            <ClickOutsideListener
                handler={() => {
                    setIsFocused(false)
                    setSearch("")
                }}>
                {(ref: RefObject<HTMLDivElement>) => (
                    <div className="relative my-[1rem]" ref={ref}>
                        <img
                            src="/search-lg.svg"
                            alt="Search"
                            width={18}
                            height={18}
                            loading="eager"
                            className="absolute top-0 bottom-0 my-auto ml-3"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            type="text"
                            className="border rounded-xl p-[.7rem] pl-11 w-full placeholder:text-gray-600 focus:outline-none transition-shadow duration-150 ease-in focus:ring focus:ring-slate-700 text-sm"
                            placeholder="Search"
                        />
                    </div>
                )}
            </ClickOutsideListener>
            <ul className="scrollbar scrollbar-rounded scroll-smooth overflow-hidden hover:overflow-auto">
                {isFocused
                    ? searchData?.map((data) => (
                          <SearchUserList
                              key={data.id}
                              data={data}
                              createRoomHandle={createRoomHandler}
                          />
                      ))
                    : room_participants?.map((data) => (
                          <SidebarMessage key={data.profile_id} data={data} />
                      ))}
            </ul>
        </div>
    )
}
