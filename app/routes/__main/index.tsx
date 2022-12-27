import { json, LoaderArgs, redirect } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import { createServerClient } from "~/utils"
import { TypedSupabaseClient } from "../__main"

export const loader = async ({ request }: LoaderArgs) => {
    const response = new Response()
    const supabase = createServerClient({ request, response })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (session === null) return redirect("/auth")

    return json({ session })
}

const Home = () => {
    const { session } = useLoaderData<typeof loader>()
    const { supabase } = useOutletContext<{ supabase: TypedSupabaseClient }>()

    return (
        <div className="center">
            <div className="flex flex-col gap-4">
                <span className="font-700 text-3xl">{session.user.email}</span>
                <button
                    className="btn-icon border-2 border-slate-900 w-full"
                    onClick={() => supabase.auth.signOut()}>
                    log out
                </button>
            </div>
        </div>
    )
}

export default Home
