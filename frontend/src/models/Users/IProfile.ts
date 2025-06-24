import {IRoomsPaginated} from "../Rooms/IRoomsPaginated";

export interface IProfile {
    id: number,
    name: string,
    surname: string,
    age: number,
    phone: string | null,
    city: string | null,
    add_int_info: string | null,
    wishlist: IRoomsPaginated
}