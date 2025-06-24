import {ICategory} from "../Category/ICategory";
import {IRoomType} from "../RoomType/IRoomType";

export interface IRoom {
    id: number,
    is_active: boolean,
    is_visible: boolean,
    category: ICategory,
    room_type: IRoomType,
    title: string,
    floor: number,
    area: number,
    beds_num: number,
    desc: string,
    price: number,
    profanity_count: number
}