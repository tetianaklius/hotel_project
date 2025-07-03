import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {bookingsActions} from "../../redux/slices/bookingSlice";
import {MyBookingsComponent} from "../../components/MyBookingsComponent/MyBookingsComponent";

export const MyBookingsPage = () => {
    const dispatch = useAppDispatch();
    const {currentPage} = useAppSelector(state => state.bookingsSlice);

    useEffect((): void => {
        dispatch(bookingsActions.loadOwnBookings());
    }, [currentPage])


    return (
        <div>
            <MyBookingsComponent/>
        </div>
    );
};
