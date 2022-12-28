export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
    public: {
        Tables: {
            messages: {
                Row: {
                    id: string
                    profile_id: string
                    room_id: string
                    content: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    profile_id?: string
                    room_id: string
                    content: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    profile_id?: string
                    room_id?: string
                    content?: string
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    username: string
                    avatar: string
                    created_at: string
                }
                Insert: {
                    id: string
                    username: string
                    avatar: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string
                    avatar?: string
                    created_at?: string
                }
            }
            room_participants: {
                Row: {
                    profile_id: string
                    room_id: string
                    created_at: string
                    last_message: string | null
                }
                Insert: {
                    profile_id: string
                    room_id: string
                    created_at?: string
                    last_message?: string | null
                }
                Update: {
                    profile_id?: string
                    room_id?: string
                    created_at?: string
                    last_message?: string | null
                }
            }
            rooms: {
                Row: {
                    id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            create_new_room: {
                Args: { other_user_id: string }
                Returns: string
            }
            is_room_participant: {
                Args: { room_id: string }
                Returns: boolean
            }
            search_profile: {
                Args: { name: string }
                Returns: {
                    id: string
                    avatar: string
                    username: string
                    created_at: string
                }
            }
        }
        Enums: {
            [_ in never]: never
        }
    }
}
