export const baseURL = "/api"

export const urls = {
    auth: {
        login: "/auth",
        activate: "/auth/activate/",
        refresh: "/auth/refresh"
    },
    users: {
        create: "/users/create",
        all: "/users",
        byId: (id) => `/users/${id}`,
        own_profile: "/users/my_profile",
        user_to_staff: (id) => `/users/${id}/to_staff`,
        block_: (id) => `/users/${id}/block`,
        unblock: (id) => `/users/${id}/unblock`,
        search: (page, params) => `/users?page=${page}&${params}`,
        save_wishlist: () => `/users/save_wishlist`
    },
    rooms: {
        create: "/rooms/create",
        all_for_user: "/rooms",
        all_for_admin: "/rooms/internal",
        by_id_for_user: (id) => `/rooms/${id}`,
        by_id_for_admin: (id) => `/rooms/${id}/internal`,
        search: (page, params) => `/rooms?page=${page}&${params}`,  // todo
    },
    regions: {
        all: "/regions",
        create: "/regions"
    },
    cities: {
        create: (id) => `cities/region/${id}`,
        // all: "/cities",
        byRegion: (id) => `/cities/region/${id}`,
    },
    bookings: {
        create: "bookings/new",
        own_bookings: "bookings/my_bookings",
        all: "/bookings/admin",
        by_id: (id) => `/bookings/${id}`
    }
}