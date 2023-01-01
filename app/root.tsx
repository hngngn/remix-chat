import type { LinksFunction, MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import reset from "@unocss/reset/tailwind.css"
import remixImageStyles from "remix-image/remix-image.css"
import custom from "~/assets/styles/custom.css"
import inter from "~/assets/styles/inter.css"
import uno from "../styles/uno.css"

import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "RemixChat",
    viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
    {
        rel: "stylesheet preload prefetch",
        href: remixImageStyles,
        as: "style",
    },
    {
        rel: "stylesheet preload prefetch",
        href: custom,
        as: "style",
    },
    {
        rel: "stylesheet preload prefetch",
        href: reset,
        as: "style",
    },
    {
        rel: "stylesheet preload prefetch",
        href: uno,
        as: "style",
    },
    {
        rel: "stylesheet preload prefetch",
        href: inter,
        as: "style",
    },
]

TimeAgo.addDefaultLocale(en)

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
