import type { LoaderArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"
import { Outlet, useLocation, useNavigate, useOutletContext } from "@remix-run/react"
import { Sidebar } from "~/components"
import { useIsOnline } from "~/hooks"
import type { SupabaseContext } from "~/routes/__main"
import { createServerClient } from "~/utils"

export const loader = async ({ request }: LoaderArgs) => {
    const response = new Response()
    const supabase = createServerClient({ request, response })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (session === null) return redirect("/auth")

    return null
}

const Home = () => {
    const { supabase, session, room_participants } = useOutletContext<SupabaseContext>()
    const navigate = useNavigate()
    const signOutHandle = () => {
        supabase.auth.signOut()
        navigate("/auth", { replace: true })
    }
    const location = useLocation()
    useIsOnline(session?.user.id)

    return (
        <div className="flex h-full">
            <div className={`${location.pathname === "/" ? "block" : "hidden md:block"}`}>
                <Sidebar user={session?.user} handleSignOut={signOutHandle} />
            </div>
            <main
                className={`md:min-w-[calc(100vw-80px-320px)] w-screen ${
                    location.pathname === "/" ? "hidden md:block" : "block"
                }`}>
                <Outlet context={{ supabase, session, room_participants }} />
            </main>
        </div>
    )
}

export default Home
