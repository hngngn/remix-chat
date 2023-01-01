import { atom } from "jotai"
import type { Messages } from "~/types/database"

export const messagesAtom = atom<Messages[] | null>(null)
export const useMessages = atom<Messages[] | null, Messages[] | null>(
    (get) => get(messagesAtom),
    (_get, set, payload) => set(messagesAtom, payload)
)
