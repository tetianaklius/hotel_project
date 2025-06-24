import {IUser} from "./IUser";
import {IRoomsPaginated} from "../Rooms/IRoomsPaginated";

export interface IWishlist {
    user: IUser,
    rooms: IRoomsPaginated
}
