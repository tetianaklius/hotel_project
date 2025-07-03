import {IUser} from "../../models/Users/IUser";
import {IUsersPaginated} from "../../models/Users/IUsersPaginated";
import {IWishlist} from "../../models/Wishlist/IWishlist";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {usersApiService} from "../../services/users.api.service";
import {IRoomsPaginated} from "../../models/Rooms/IRoomsPaginated";
import {IRoom} from "../../models/Rooms/IRoom";

type UsersSliceType = {
    allUsersPag: IUsersPaginated | null,
    currentUser: IUser | null,
    userWishlist: IWishlist | null,
    isLoaded: boolean,
    currentPage: number,
    page: number,  // todo
    useDarkTheme: boolean  // TODO
}

const usersInitState: UsersSliceType = {
    allUsersPag: null,
    currentUser: null,
    userWishlist: null,
    isLoaded: false,
    currentPage: 1,
    page: 1,  // todo
    useDarkTheme: false  // TODO
}

const loadAllUsers = createAsyncThunk(
    "usersSlice/loadAllUsers",
    async (_, thunkAPI) => {
        try {
            const allUsersPag: IUsersPaginated = await usersApiService.getAll();
            return thunkAPI.fulfillWithValue(allUsersPag);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });

const loadCurrentUser = createAsyncThunk(
    "usersSlice/loadCurrentUser",
    async (id: string, thunkAPI) => {
        try {
            const currentUser: IUser = await usersApiService.own_profile();
            return thunkAPI.fulfillWithValue(currentUser);
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });

const saveUserWishlist = createAsyncThunk(
    "usersSlice/saveUserWishlist",
    async (roomsPag:IRoomsPaginated, thunkAPI) => {
        try {  // todo
            const wishlist: IWishlist = await usersApiService.saveWishlist(roomsPag);
            return thunkAPI.fulfillWithValue(wishlist);  // todo
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    });


export const usersSlice = createSlice({
        name: "usersSlice",
        initialState: usersInitState,
        reducers: {
            changeLoadStatus: (state, action: PayloadAction<boolean>) => {
                state.isLoaded = action.payload;
            },
            changePage: (state, action: PayloadAction<number>) => {
                state.currentPage = action.payload;
            },
            changeTheme: (state, action) => {
                state.useDarkTheme = action.payload;
            },  // todo
            updateWishlist: (state, action: PayloadAction<IRoom>) => {
                // @ts-ignore  // TODO
                state.userWishlist = state.userWishlist.rooms.results.push(action.payload);


                // state.userWishlist = [...state, action.payload];  // TODO
                // state.userWishlist = action.payload;
          }

            // changeQuery: (state, action: PayloadAction<string | null>) => {
            //     state.query = action.payload;
            // },  // todo

        },
        extraReducers: builder =>
            builder
                .addCase(loadAllUsers.fulfilled, (state, action: PayloadAction<IUsersPaginated>) => {
                    state.allUsersPag = action.payload;
                })
                .addCase(loadAllUsers.rejected, (state, action) => {
                    ///  todo
                })
                .addCase(loadCurrentUser.fulfilled, (state, action: PayloadAction<IUser>) => {
                    state.currentUser = action.payload;
                })
                .addCase(loadCurrentUser.rejected, (state, action) => {
                    ///  todo
                })
                .addCase(saveUserWishlist.fulfilled, (state, action: PayloadAction<IWishlist>) => {
                    state.userWishlist = action.payload;
                })

    }
)

export const usersActions = {
    ...usersSlice.actions,
    loadAllUsers,
    loadCurrentUser,
    saveUserWishlist
}