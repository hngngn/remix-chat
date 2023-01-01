import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Outlet, useFetcher, useLoaderData, useLocation, useNavigate } from "@remix-run/react"
import type { Session, SupabaseClient } from "@supabase/auth-helpers-remix"
import { createBrowserClient } from "@supabase/auth-helpers-remix"
import { useEffect, useState } from "react"
import { useFullViewMobile } from "~/hooks"
import type { Room_participants } from "~/types/database"
import type { Database } from "~/types/supabase"
import { createServerClient } from "~/utils"

export type TypedSupabaseClient = SupabaseClient<Database>
export type MaybeSession = Session | null

export type SupabaseContext = {
    supabase: TypedSupabaseClient
    session: MaybeSession
    room_participants: Room_participants[]
}

export const loader = async ({ request }: LoaderArgs) => {
    const env = {
        SUPABASE_URL: process.env.SUPABASE_URL!,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
    }
    const response = new Response()
    const supabase = createServerClient({ request, response })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    const { data: room_participants } = await supabase
        .from("room_participants")
        .select("*, profiles(*)")
        .neq("profile_id", session?.user.id)

    return json(
        {
            env,
            session,
            room_participants: room_participants as Room_participants[],
        },
        {
            headers: response.headers,
        }
    )
}

const Supabase = () => {
    const { env, session, room_participants } = useLoaderData<typeof loader>()
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const location = useLocation()

    const [supabase] = useState(() =>
        createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
    )

    const serverAccessToken = session?.access_token

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== serverAccessToken) {
                fetcher.submit(null, {
                    method: "post",
                    action: "/handle-auth",
                })
            }
            if (event === "SIGNED_IN")
                navigate(location.pathname !== "/auth" ? location.pathname : "/")
            if (event === "SIGNED_OUT") navigate("/auth")
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [serverAccessToken, supabase, fetcher])
    const height = useFullViewMobile()

    return (
        <div
            style={{
                height: height ? `${height}px` : "100vh",
            }}>
            <Outlet context={{ supabase, session, room_participants }} />
        </div>
    )
}

export default Supabase
