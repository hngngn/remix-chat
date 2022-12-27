import { json, LoaderArgs, redirect } from "@remix-run/node"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import { createServerClient } from "~/utils"
import { TypedSupabaseClient } from "../__main"

type ProviderList = {
    title: string
    url: string
    provider: "Github" | "Google"
}

export const loader = async ({ request }: LoaderArgs) => {
    const env = {
        PRODUCTION_URL: process.env.PRODUCTION_URL,
    }
    const response = new Response()
    const supabase = createServerClient({ request, response })
    const {
        data: { session },
    } = await supabase.auth.getSession()
    if (session !== null) return redirect("/")

    return json({ env })
}

const Auth = () => {
    const { env } = useLoaderData<typeof loader>()
    const providerList: ProviderList[] = [
        {
            provider: "Github",
            title: "Continue with Github",
            url: "/github.png",
        },
        {
            provider: "Google",
            title: "Continue with Google",
            url: "/google.png",
        },
    ]
    const { supabase } = useOutletContext<{ supabase: TypedSupabaseClient }>()
    const signInHandle = async (provider: "Github" | "Google") => {
        if (provider === "Github")
            return await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: env.PRODUCTION_URL || "http://localhost:3000",
                },
            })
        return await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: env.PRODUCTION_URL || "http://localhost:3000",
            },
        })
    }

    return (
        <div className="center">
            <div className="flex flex-col w-[20em]">
                <h1 className="text-3xl font-800 text-center">Sign in to RemixChat</h1>
                <div className="flex flex-col gap-4 mt-8">
                    {providerList.map((data) => (
                        <button
                            onClick={() => signInHandle(data.provider)}
                            key={data.provider}
                            className={`btn-icon transition-transform transform active:scale-98 ${
                                data.provider === "Github"
                                    ? "bg-slate-900 text-white"
                                    : "border-2 border-slate-900"
                            }`}>
                            <span>
                                <img src={data.url} alt={data.provider} width={24} height={24} />
                            </span>
                            <span>{data.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Auth
