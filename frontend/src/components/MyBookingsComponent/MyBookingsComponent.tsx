import React from "react";

import {useAppSelector} from "../../redux/store";
import {IBooking} from "../../models/Bookings/IBooking";
import {BookingComponent} from "../BookingComponent/BookingComponent";

export const MyBookingsComponent = () => {
    const {ownBookings} = useAppSelector(state => state.bookingSlice);

    return (
        <div>
            {ownBookings && ownBookings.data.map((booking: IBooking) => <BookingComponent key={booking.id}
                                                                                             booking={booking}/>)}
        </div>
    );
};
