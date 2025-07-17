import {apiService} from "./api.service";
import {IUsersPaginated} from "../models/Users/IUsersPaginated";
import {urls} from "../constants/urls";
import {IUser} from "../models/Users/IUser";
import {IRoomsPaginated} from "../models/Rooms/IRoomsPaginated";
import {IWishlist} from "../models/Wishlist/IWishlist";
import {IProfile} from "../models/Users/IProfile";

export const usersApiService = {
    create:
        async (data: IUser): Promise<IUsersPaginated> => {
            const response = await apiService.post<IUsersPaginated>(urls.users.create, data)
            return response.data;
        },
    getAll: async (): Promise<IUsersPaginated> => {
        const response = await apiService.get<IUsersPaginated>(urls.users.all);
        return response.data
    },
    getById: async (id: string): Promise<IUser> => {
        const response = await apiService.get<IUser>(urls.users.byId(+id));
        return response.data;
    },
    own_profile: async (): Promise<IProfile> => {
        const response = await apiService.get<IProfile>(urls.users.own_profile);
        return response.data;
    },
    user_to_staff: async (id: string): Promise<IUser> => {
        const response = await apiService.patch<IUser>(urls.users.user_to_staff(+id));
        return response.data;
    },
    block_: async (id: string): Promise<IUser> => {
        const response = await apiService.patch<IUser>(urls.users.block_(+id));
        return response.data;
    },
    unblock_: async (id: string): Promise<IUser> => {
        const response = await apiService.patch<IUser>(urls.users.unblock_(+id));
        return response.data;
    },
    search: async (page: number, searchParams: string): Promise<IUsersPaginated> => {
        const response = await apiService.get<IUsersPaginated>(urls.users.search(page, searchParams))
        return response.data;
    },
    saveWishlist: async (roomsPag:IRoomsPaginated): Promise<IWishlist> => {
        const response = await apiService.put<IWishlist>(urls.users.save_wishlist())
        return response.data;  // todo
    }
}