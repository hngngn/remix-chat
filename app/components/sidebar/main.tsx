import { useState } from "react"
import { UserInfoModal } from "../modal"
import { SidebarLeft } from "./left"
import { SidebarRight } from "./right"

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex h-full">
            <SidebarLeft setIsOpen={setIsOpen} />
            <UserInfoModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <SidebarRight />
        </div>
    )
}
