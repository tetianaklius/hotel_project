import {IBooking} from "./IBooking";

export interface IBookingsPaginated {
    page: number,
    prev: boolean,
    next: boolean,
    data: IBooking[],
    total_pages?: number
    total_items?: number,
}