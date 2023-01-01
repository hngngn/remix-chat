import { atom } from "jotai"
import type { Messages } from "~/types/database"

export const lastMessage = atom<Messages | null>(null)
export const useLastMessage = atom<Messages | null, Messages | null>(
    (get) => get(lastMessage),
    (_get, set, payload) => set(lastMessage, payload)
)
