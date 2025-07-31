import React, {useEffect} from "react";

import {useAppSelector} from "../../redux/store";
import {IBooking} from "../../models/Bookings/IBooking";
import {BookingComponent} from "../BookingComponent/BookingComponent";

export const MyBookingsComponent = () => {
    const {ownBookings} = useAppSelector(state => state.bookingsSlice);
    console.log(ownBookings)

    useEffect(() => {

    }, [ownBookings]);

    return (
        <div>
            {ownBookings && ownBookings.map((booking: IBooking) => <BookingComponent key={booking.id}
                                                                                             booking={booking}/>)}
        </div>
    );
};
