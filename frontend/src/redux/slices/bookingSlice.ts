import {IBookingsPaginated} from "../../models/Bookings/IBookingsPaginated";
import {IBooking} from "../../models/Bookings/IBooking";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {bookingService} from "../../services/booking.api.service";


type BookingSliceType = {
    allBookingsPag: IBookingsPaginated | null,
    ownBookings: IBookingsPaginated | null,
    currentBooking: IBooking | null,
    isLoaded: boolean,
    currentPage: number,
    page: number,  // todo
    query: string | null,  // todo
    useDarkTheme: boolean  // TODO
}

const bookingsInitState: BookingSliceType = {
    allBookingsPag: null,
    ownBookings: null,
    currentBooking: null,
    isLoaded: false,
    currentPage: 1,
    page: 1,  // todo
    query: null,  // todo
    useDarkTheme: false  // TODO
}

const loadAllBookings = createAsyncThunk(
    "bookingsSlice/loadAllBookings",
    async (_, thunkAPI) => {
        try {
            const bookings: IBookingsPaginated = await bookingService.getAll();
            return thunkAPI.fulfillWithValue(bookings);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });

const loadOwnBookings = createAsyncThunk(
    "bookingsSlice/loadOwnBookings",
    async (_, thunkAPI) => {
        try {
            const bookings: IBookingsPaginated = await bookingService.getOwn();
            return thunkAPI.fulfillWithValue(bookings);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });

const loadBookingById = createAsyncThunk(
    "bookingsSlice/loadBookingById",
    async (id: string, thunkAPI) => {
        try {
            const booking: IBooking = await bookingService.getById(id);
            return thunkAPI.fulfillWithValue(booking);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)

export const bookingsSlice = createSlice({
        name: "bookingsSlice",
        initialState: bookingsInitState,
        reducers: {
            changeLoadStatus: (state, action: PayloadAction<boolean>) => {
                state.isLoaded = action.payload;
            },
            changeQuery: (state, action: PayloadAction<string | null>) => {
                state.query = action.payload;
            },
            changePage: (state, action: PayloadAction<number>) => {
                state.currentPage = action.payload;
            },
            changeTheme: (state, action) => {
                state.useDarkTheme = action.payload;
            },  // todo
            setCurrentBooking: (state, action) => {
                state.currentBooking = action.payload;
            }
        },
        extraReducers: builder =>
            builder
                .addCase(loadAllBookings.fulfilled, (state, action: PayloadAction<IBookingsPaginated>) => {
                    state.allBookingsPag = action.payload;
                })
                .addCase(loadAllBookings.rejected, (state, action) => {
                    ///  todo
                })
                .addCase(loadOwnBookings.fulfilled, (state, action: PayloadAction<IBookingsPaginated>) => {
                    state.ownBookings = action.payload;
                })
                .addCase(loadOwnBookings.rejected, (state, action) => {
                    ///  todo
                })

    }
)

export const bookingsActions = {
    ...bookingsSlice.actions,
    loadAllBookings,
    loadOwnBookings,
    loadBookingById
}