import { json, LoaderArgs } from "@remix-run/node"
import { Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react"
import { createBrowserClient, Session, SupabaseClient } from "@supabase/auth-helpers-remix"
import { useEffect, useState } from "react"
import { Database } from "~/types/supabase"
import { createServerClient } from "~/utils"

export type TypedSupabaseClient = SupabaseClient<Database>
export type MaybeSession = Session | null

export type SupabaseContext = {
    supabase: TypedSupabaseClient
    session: MaybeSession
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

    return json(
        {
            env,
            session,
        },
        {
            headers: response.headers,
        }
    )
}

const Supabase = () => {
    const { env, session } = useLoaderData<typeof loader>()
    const fetcher = useFetcher()
    const navigate = useNavigate()

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
            if (event === "SIGNED_OUT") navigate("/auth")
        })

        return () => subscription.unsubscribe()
    }, [serverAccessToken, supabase, fetcher])

    return (
        <>
            <Outlet context={{ supabase, session }} />
        </>
    )
}

export default Supabase
