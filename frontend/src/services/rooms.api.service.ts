import {IRoom} from "../models/Rooms/IRoom";
import {apiService} from "./api.service";
import {urls} from "../constants/urls";
import {IRoomsPaginated} from "../models/Rooms/IRoomsPaginated";


export const roomsService = {
    create: async (data: IRoom): Promise<IRoomsPaginated> => {
        const response = await apiService.post<IRoomsPaginated>(urls.rooms.create, data)
        return response.data;
    },
    getAllVisible: async (): Promise<IRoomsPaginated> => {
        const response = await apiService.get<IRoomsPaginated>(urls.rooms.all_for_user);
        return response.data;
    },
    getAll: async (): Promise<IRoomsPaginated> => {
        const response = await apiService.get<IRoomsPaginated>(urls.rooms.all_for_admin);
        return response.data
    },
    getByIdVisible: async (id: string): Promise<IRoom> => {
        const response = await apiService.get<IRoom>(urls.rooms.by_id_for_user(+id), {params: {language: "uk-UA"}});  // todo
        return response.data;
    },
    getById: async (id: string): Promise<IRoom> => {
        const response = await apiService.get<IRoom>(urls.rooms.by_id_for_admin(+id));
        return response.data;
    },
    search: async (page: number, searchParams: string): Promise<IRoomsPaginated> => {
        const response = await apiService.get<IRoomsPaginated>(urls.rooms.search(page, searchParams))
        return response.data;
    }
}