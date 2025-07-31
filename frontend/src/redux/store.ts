import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {roomsSlice} from "./slices/roomsSlice";
import {usersSlice} from "./slices/usersSlice";
import {bookingsSlice} from "./slices/bookingSlice";


export const store = configureStore({
    reducer: {
        roomsSlice: roomsSlice.reducer,
        bookingsSlice: bookingsSlice.reducer,
        usersSlice: usersSlice.reducer
    }
});

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();