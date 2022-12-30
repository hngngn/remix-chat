import { Dialog, Transition } from "@headlessui/react"
import type { User } from "@supabase/supabase-js"
import { Fragment } from "react"
import { Image } from "remix-image"

type Props = {
    isOpen: boolean
    setIsOpen: (arg: boolean) => void
    user: User | undefined
}

export const UserInfoModal = (props: Props) => {
    const { isOpen, setIsOpen, user } = props

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex justify-between items-center">
                                    <Dialog.Title
                                        as="h1"
                                        className="text-xl font-600 leading-6 text-gray-900">
                                        Profile
                                    </Dialog.Title>
                                    <button
                                        className="flex justify-center items-center bg-indigo-50 p-1 rounded-2"
                                        onClick={() => setIsOpen(false)}>
                                        <Image
                                            src="/x-close.svg"
                                            alt="Close"
                                            loading="lazy"
                                            placeholder="blur"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                                <div className="mt-2 flex flex-col gap-4 items-center">
                                    <Image
                                        src={user?.user_metadata.avatar_url}
                                        alt={user?.user_metadata.full_name}
                                        width={90}
                                        height={90}
                                        loading="lazy"
                                        placeholder="blur"
                                        className="rounded-full"
                                    />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="pr-4 py-2 font-500">Username:</td>
                                                <td className="text-slate-700">
                                                    {user?.user_metadata.full_name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pr-4 py-2 font-500">Email:</td>
                                                <td className="text-slate-700">{user?.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
