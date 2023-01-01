import { Menu, Transition } from "@headlessui/react"
import { useNavigate, useOutletContext } from "@remix-run/react"
import { Fragment } from "react"
import { Image, MimeType } from "remix-image"
import type { SupabaseContext } from "~/routes/__main"

type Props = {
    setIsOpen: (arg: boolean) => void
}

export const SidebarUserInfo = (props: Props) => {
    const { setIsOpen } = props
    const { supabase, session } = useOutletContext<SupabaseContext>()
    const navigate = useNavigate()
    const signOutHandle = () => {
        supabase.auth.signOut()
        navigate("/auth", { replace: true })
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="focus:outline-none">
                <Image
                    src={session?.user.user_metadata.avatar_url}
                    alt={session?.user.user_metadata.full_name}
                    width={43}
                    height={43}
                    loading="eager"
                    loaderUrl="/api/image"
                    options={{
                        contentType: MimeType.WEBP,
                    }}
                    className="rounded-full"
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Menu.Items className="absolute bottom-full left-0 mb-4 max-w-[12em] w-screen z-10 transform px-4">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-7">
                        <Menu.Item as="div" className="relative bg-white p-2">
                            <span className="block p-2 text-xs font-medium uppercase text-gray-500">
                                General
                            </span>
                            <button
                                className="flex items-center rounded-lg p-1 transition duration-200 ease-out hover:bg-blue-50 hover:text-blue-700 focus:outline-none w-full font-medium text-gray-900 text-sm"
                                onClick={() => setIsOpen(true)}>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
                                    <Image
                                        src="/image-user.svg"
                                        alt="Profile"
                                        loading="eager"
                                        loaderUrl="/api/image"
                                        options={{
                                            contentType: MimeType.WEBP,
                                        }}
                                        width={18}
                                        height={18}
                                    />
                                </div>
                                <span>Profile</span>
                            </button>
                        </Menu.Item>
                        <Menu.Item as="div" className="bg-slate-50 p-2">
                            <button
                                className="flex items-center rounded-lg p-1 transition duration-200 ease-out hover:bg-red-200 hover:text-red-700 focus:outline-none w-full font-medium text-gray-900 text-sm"
                                onClick={signOutHandle}>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
                                    <Image
                                        src="/log-out-02.svg"
                                        alt="Profile"
                                        loading="eager"
                                        loaderUrl="/api/image"
                                        options={{
                                            contentType: MimeType.WEBP,
                                        }}
                                        width={18}
                                        height={18}
                                    />
                                </div>
                                <span>Log out</span>
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
