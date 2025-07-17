import {IProfile} from "../Users/IProfile";
import {IRoom} from "../Rooms/IRoom";

export interface IBooking {
    id: number,
    status: string,
    user_profile: IProfile
    room: IRoom,
    // date_range: DateRange<Dayjs>,
    start_date: string,
    end_date: string,
    persons: number,
    comment: string,
    comment_internal: string,
    prepayment: boolean,
    payment: boolean,
}