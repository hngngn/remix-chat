import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Outlet, useLoaderData, useLocation, useNavigate, useOutletContext } from "@remix-run/react"
import { Sidebar } from "~/components"
import type { SupabaseContext } from "~/routes/__main"
import type { Room_participants } from "~/types/database"
import { createServerClient } from "~/utils"

export const loader = async ({ request, params }: LoaderArgs) => {
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

    return json({
        room_participants: room_participants as Room_participants[],
    })
}

const Home = () => {
    const { room_participants } = useLoaderData<typeof loader>()
    const { supabase, session } = useOutletContext<SupabaseContext>()
    const navigate = useNavigate()
    const signOutHandle = () => {
        supabase.auth.signOut()
        navigate("/auth", { replace: true })
    }
    const location = useLocation()

    return (
        <div className="flex h-screen">
            <div className={`${location.pathname === "/" ? "block" : "hidden md:block"}`}>
                <Sidebar
                    user={session?.user}
                    handleSignOut={signOutHandle}
                    room_participants={room_participants}
                />
            </div>
            <main
                className={`md:min-w-[calc(100vw-80px-320px)] w-screen ${
                    location.pathname === "/" ? "hidden md:block" : "block"
                }`}>
                <Outlet context={{ room_participants, supabase, session }} />
            </main>
        </div>
    )
}

export default Home
