import { atom } from "jotai"

type Props = {
    message: string | undefined
    room_id: string | undefined
}

export const lastMessage = atom<Props>({} as Props)
export const useLastMessage = atom<Props, Props>(
    (get) => get(lastMessage),
    (_get, set, payload) => set(lastMessage, payload)
)
