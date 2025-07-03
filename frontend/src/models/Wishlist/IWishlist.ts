import {IUser} from "../Users/IUser.ts";
import {IRoomsPaginated} from "../Rooms/IRoomsPaginated.ts";

export interface IWishlist {
    user: IUser,
    rooms: IRoomsPaginated
}
