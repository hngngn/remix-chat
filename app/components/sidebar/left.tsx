import { Link } from "@remix-run/react"
import type { User } from "@supabase/supabase-js"
import { Image } from "remix-image"
import { SidebarUserInfo } from "./user-info"

type Props = {
    user: User | undefined
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
                    <Image src="/home-line.svg" alt="Home" loading="eager" width={22} height={22} />
                </Link>
                <button className="btn-icon bg-blue-50 w-full !h-[2.8rem]">
                    <Image
                        src="/message-circle.svg"
                        alt="Message"
                        loading="eager"
                        width={22}
                        height={22}
                    />
                </button>
            </div>
            <SidebarUserInfo handleSignOut={handleSignOut} user={user} setIsOpen={setIsOpen} />
        </div>
    )
}
