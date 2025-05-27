import {IRoom} from "./IRoom";


export interface IRoomsPaginated {
    page: number,
    results: IRoom[],
    total_pages?: number
    total_results?: number,
}