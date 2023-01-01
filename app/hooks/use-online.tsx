import { useOutletContext } from "@remix-run/react"
import { useSetAtom } from "jotai"
import { useEffect } from "react"
import type { SupabaseContext } from "~/routes/__main"
import { useOnline } from "~/stores"

export const useIsOnline = (profile_id: string | undefined) => {
    const { supabase } = useOutletContext<SupabaseContext>()
    const setIsOnline = useSetAtom(useOnline)
    useEffect(() => {
        const channel = supabase.channel("user-online", {
            config: {
                presence: {
                    key: "user",
                },
            },
        })
        channel.on(
            "presence",
            {
                event: "sync",
            },
            () => {
                const { user } = channel.presenceState()
                setIsOnline(user as any[])
            }
        )
        // channel.on("presence", { event: "join" }, ({ newPresences }) => {
        //     console.log("New users have joined: ", newPresences)
        // })
        // channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
        //     // console.log("Users have left: ", leftPresences)
        // })
        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") await channel.track({ profile_id })
        })

        return () => {
            channel.unsubscribe()
        }
    }, [])
}
