import type { User } from "@supabase/supabase-js"
import { useState } from "react"
import { UserInfoModal } from "../modal"
import { SidebarLeft } from "./left"
import { SidebarRight } from "./right"

type Props = {
    user: User | undefined
    handleSignOut: () => void
}

export const Sidebar = (props: Props) => {
    const { user, handleSignOut } = props
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex h-full">
            <SidebarLeft handleSignOut={handleSignOut} setIsOpen={setIsOpen} user={user} />
            <UserInfoModal isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
            <SidebarRight />
        </div>
    )
}
