import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Outlet, useLoaderData, useNavigate, useOutletContext } from "@remix-run/react"
import { Sidebar } from "~/components"
import type { TypedSupabaseClient } from "~/routes/__main"
import type { Room_participants } from "~/types/database"
import { createServerClient } from "~/utils"

export const loader = async ({ request }: LoaderArgs) => {
    const response = new Response()
    const supabase = createServerClient({ request, response })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (session === null) return redirect("/auth")
    const { data: room_participants } = await supabase
        .from("room_participants")
        .select("*, profiles(*)")
        .neq("profile_id", session.user.id)

    return json({ session, room_participants })
}

const Home = () => {
    const { session, room_participants } = useLoaderData<typeof loader>()
    const { supabase } = useOutletContext<{ supabase: TypedSupabaseClient }>()
    const navigate = useNavigate()
    const signOutHandle = () => {
        supabase.auth.signOut()
        navigate("/auth", { replace: true })
    }

    return (
        <div className="flex h-screen">
            <Sidebar
                user={session.user}
                handleSignOut={signOutHandle}
                room_participants={room_participants as Room_participants[]}
            />
            <main className="p-4 hidden md:block min-w-[calc(100vw-80px-320px)] min-h-[calc(100vh-16px*2)]">
                <Outlet />
            </main>
        </div>
    )
}

export default Home
