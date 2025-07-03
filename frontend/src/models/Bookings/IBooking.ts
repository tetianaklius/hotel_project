import {IProfile} from "../Users/IProfile";
import {IRoom} from "../Rooms/IRoom";

export interface IBooking {
    id:number,
    status: string,
    user_profile: IProfile
    room: IRoom,
    start_date: Date,
    end_date: Date,
    persons: number,
    comment: string,
    comment_internal: string,
    prepayment: boolean,
    payment: boolean,
}