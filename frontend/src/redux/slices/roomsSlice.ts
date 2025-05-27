import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IRoom} from "../../models/Rooms/IRoom";
import {IRoomsPaginated} from "../../models/Rooms/IRoomsPaginated";
import {roomsService} from "../../services/rooms.api.service";


type RoomsSliceType = {
    roomsPag: IRoomsPaginated | null,
    room: IRoom | null,
    isLoaded: boolean,
    roomDetailed: IRoom | null,
    currentPage: number,
    page: number,  // todo
    query: string | null,
    useDarkTheme: boolean  // TODO
}

const roomsInitState: RoomsSliceType = {
    roomsPag: null,
    room: null,
    isLoaded: false,
    roomDetailed: null,
    currentPage: 1,
    page: 1,
    query: null,
    useDarkTheme: false
}

const loadAllVisibleRooms = createAsyncThunk(
    "roomsSlice/loadAllVisibleRooms",
    async (_, thunkAPI) => {
        try {
            const rooms: IRoomsPaginated = await roomsService.getAllVisible();
            return thunkAPI.fulfillWithValue(rooms);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });

const loadAllRooms = createAsyncThunk(
    "roomsSlice/loadAllRooms",
    async (_, thunkAPI) => {
        try {
            const rooms: IRoomsPaginated = await roomsService.getAll();
            return thunkAPI.fulfillWithValue(rooms);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });

const loadRoomDetails = createAsyncThunk(
    "roomsSlice/loadRoomDetails",
    async (id: string, thunkAPI) => {
        try {
            const room: IRoom = await roomsService.getByIdVisible(id);
            return thunkAPI.fulfillWithValue(room);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });


export const roomsSlice = createSlice({
        name: "roomsSlice",
        initialState: roomsInitState,
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
            }  // todo
        },
        extraReducers: builder =>
            builder
                .addCase(loadAllVisibleRooms.fulfilled, (state, action: PayloadAction<IRoomsPaginated>) => {
                    state.roomsPag = action.payload;
                })
                .addCase(loadAllVisibleRooms.rejected, (state, action) => {
                    ///  todo
                })
                .addCase(loadAllRooms.fulfilled, (state, action: PayloadAction<IRoomsPaginated>) => {
                    state.roomsPag = action.payload;
                })
                .addCase(loadAllRooms.rejected, (state, action) => {
                    ///  todo
                })
                .addCase(loadRoomDetails.fulfilled, (state, action: PayloadAction<IRoom>) => {
                    state.room = action.payload;
                })
                .addCase(loadRoomDetails.rejected, (state, action) => {
                    ///  todo
                })

    }
)

export const roomsActions = {
    ...roomsSlice.actions,
    loadAllVisibleRooms,
    loadAllRooms,
    loadRoomDetails

}