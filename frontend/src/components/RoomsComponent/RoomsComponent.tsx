import React, {FC} from 'react';

import {RoomCardComponent} from "../RoomCardComponent/RoomCardComponent";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {IRoom} from "../../models/Rooms/IRoom";
import {usersSlice} from "../../redux/slices/usersSlice";
import styles from "./RoomsComponent.module.css";

export const RoomsComponent: FC = () => {
    const {roomsPag} = useAppSelector(state => state.roomsSlice);
    const {userWishlist} = useAppSelector(state => state.usersSlice);
    const dispatch = useAppDispatch();

    const wishlistUpdate = (room: IRoom): void => {
        // @ts-ignore  // todo
        if (!(room in userWishlist.rooms.results)) {
            dispatch(usersSlice.actions.updateWishlist(room))
        } else {
            // remove
        }
    }

    return (
        <div className={styles.rooms_box}>
            {
                roomsPag ?
                    roomsPag?.results.map((room: IRoom) => <RoomCardComponent key={room.id} room={room}
                                                                    wishlistUpdate={wishlistUpdate}/>)
                    : <h3>Loading...</h3>
            }
        </div>
    );
};
