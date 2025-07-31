import React, {FC} from "react";
import {IBooking} from "../../models/Bookings/IBooking";

interface IProps {
    booking: IBooking
}

export const BookingComponent: FC<IProps> = ({booking}) => {
    return (
        <div>
            <div>booking id: {booking.id}</div>
            {/*<div>room: {booking.room.title}</div>*/}
            <div>comment: {booking.comment}</div>
            <div>for {booking.persons} persons</div>
        </div>
    );
};
