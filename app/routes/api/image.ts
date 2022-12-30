import type { LoaderFunction } from "@remix-run/node"
import { sharpTransformer } from "remix-image-sharp"
import type { Resolver } from "remix-image/server"
import { fetchResolver, fsResolver, imageLoader, MemoryCache } from "remix-image/server"

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
    if (url.startsWith("/") && (url.length === 1 || url[1] !== "/")) {
        return fsResolver(asset, url, options, basePath)
    } else {
        return fetchResolver(asset, url, options, basePath)
    }
}

const productionUrl = process.env.PRODUCTION_URL || ""
const fixedUrl = productionUrl.startsWith("https") ? productionUrl : `https://${productionUrl}`

const config = {
    selfUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000" : fixedUrl,
    cache: new MemoryCache(),
    resolver: fetchImage,
    transformer: sharpTransformer,
    basePath: process.env.NODE_ENV === "development" ? "public" : "/",
}

export const loader: LoaderFunction = ({ request }) => {
    return imageLoader(config, request)
}
