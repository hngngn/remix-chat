import { createServerClient as _createServerClient } from "@supabase/auth-helpers-remix"
import type { Database } from "~/types/supabase"

export const createServerClient = ({
    request,
    response,
}: {
    request: Request
    response: Response
}) =>
    _createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
        request,
        response,
    })
