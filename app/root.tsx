import { LinksFunction, MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import reset from "@unocss/reset/tailwind.css"
import satoshi from "~/assets/styles/satoshi.css"
import uno from "../styles/uno.css"

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "RemixChat",
    viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: reset,
    },
    {
        rel: "stylesheet",
        href: uno,
    },
    {
        rel: "stylesheet",
        href: satoshi,
    },
]

const App = () => {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export default App
