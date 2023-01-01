import { atom } from "jotai"

export type isOnlineProps = { profile_id: string }

export const onlineAtom = atom<isOnlineProps[]>([])
export const useOnline = atom<isOnlineProps[], isOnlineProps[]>(
    (get) => get(onlineAtom),
    (_get, set, payload) => set(onlineAtom, payload)
)
