import {IUser} from "./IUser";

export interface IUsersPaginated {
    page: number,
    results: IUser[],
    total_pages?: number
    total_results?: number,
}