export type Profiles = {
    id: string /* primary key */
    username: string
    avatar: string
    created_at: string
}

export type Rooms = {
    id: string /* primary key */
    created_at: string
}

export type Messages = {
    id: string /* primary key */
    profile_id: string /* foreign key to profiles.id */
    room_id: string /* foreign key to rooms.id */
    content: string
    created_at: string
    profiles?: Profiles
    rooms?: Rooms
}

export type Room_participants = {
    profile_id: string /* primary key */ /* foreign key to profiles.id */
    room_id: string /* primary key */ /* foreign key to rooms.id */
    created_at: string
    profiles?: Profiles
    rooms?: Rooms
}
