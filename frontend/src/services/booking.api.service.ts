import {apiService} from "./api.service";
import {urls} from "../constants/urls";
import {IBooking} from "../models/Bookings/IBooking";
import {IBookingsPaginated} from "../models/Bookings/IBookingsPaginated";

export const bookingService = {
    create: async (data: IBooking): Promise<IBooking> => {
        const response = await apiService.post<IBooking>(urls.bookings.create, data)
        return response.data;
    },
    getAll: async (): Promise<IBookingsPaginated> => {
        const response = await apiService.get<IBookingsPaginated>(urls.bookings.all);
        return response.data
    },
    getOwn: async (): Promise<IBookingsPaginated> => {
        const response = await apiService.get<IBookingsPaginated>(urls.bookings.own_bookings);
        return response.data
    },
    getById: async (id: string): Promise<IBooking> => {
        const response = await apiService.get<IBooking>(urls.bookings.by_id(id));
        return response.data
    }
}