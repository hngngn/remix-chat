import { Link } from "@remix-run/react"
import { Image, MimeType } from "remix-image"
import { SidebarUserInfo } from "./user-info"

type Props = {
    setIsOpen: (arg: boolean) => void
}

export const SidebarLeft = (props: Props) => {
    const { setIsOpen } = props

    return (
        <div className="w-[5em] p-4 flex flex-col items-center justify-between border-r">
            <div className="w-full flex flex-col gap-2">
                <Link
                    to="/"
                    className="btn-icon transition duration-200 ease-out hover:bg-slate-100 w-full !h-[2.8rem]">
                    <Image
                        src="/home-line.svg"
                        alt="Home"
                        loading="eager"
                        loaderUrl="/api/image"
                        options={{
                            contentType: MimeType.WEBP,
                        }}
                        width={22}
                        height={22}
                    />
                </Link>
                <button className="btn-icon bg-slate-100 w-full !h-[2.8rem]">
                    <Image
                        src="/message-circle.svg"
                        alt="Message"
                        loading="eager"
                        loaderUrl="/api/image"
                        options={{
                            contentType: MimeType.WEBP,
                        }}
                        width={22}
                        height={22}
                    />
                </button>
            </div>
            <SidebarUserInfo setIsOpen={setIsOpen} />
        </div>
    )
}
