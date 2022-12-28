import { Link } from "@remix-run/react"
import type { User } from "@supabase/supabase-js"
import { SidebarUserInfo } from "./user-info"

type Props = {
    user: User
    setIsOpen: (arg: boolean) => void
    handleSignOut: () => void
}

export const SidebarLeft = (props: Props) => {
    const { handleSignOut, setIsOpen, user } = props

    return (
        <div className="w-[5em] p-4 flex flex-col items-center justify-between border-r">
            <div className="w-full flex flex-col gap-2">
                <Link
                    to="/"
                    className="btn-icon transition duration-200 ease-out hover:bg-blue-50 w-full !h-[2.8rem]">
                    <img src="/home-line.svg" alt="Home" width={22} height={22} loading="eager" />
                </Link>
                <button className="btn-icon bg-blue-50 w-full !h-[2.8rem]">
                    <img
                        src="/message-circle-02.svg"
                        alt="Message"
                        width={22}
                        height={22}
                        loading="eager"
                    />
                </button>
            </div>
            <SidebarUserInfo handleSignOut={handleSignOut} user={user} setIsOpen={setIsOpen} />
        </div>
    )
}
