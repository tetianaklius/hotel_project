import {IRoom} from "./IRoom";


export interface IRoomsPaginated {
    page: number,
    prev: boolean,
    next: boolean,
    data: IRoom[],
    total_pages?: number
    total_items?: number,
}
