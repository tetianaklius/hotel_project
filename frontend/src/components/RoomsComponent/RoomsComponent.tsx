import React, {FC} from "react";

import {RoomCardComponent} from "../RoomCardComponent/RoomCardComponent";
import {useAppSelector} from "../../redux/store";
import {IRoom} from "../../models/Rooms/IRoom";
import styles from "./RoomsComponent.module.css";

export const RoomsComponent: FC = () => {
    const {roomsPag} = useAppSelector(state => state.roomsSlice);

    // const {userWishlist} = useAppSelector(state => state.usersSlice);
    // const dispatch = useAppDispatch();

    // const wishlistUpdate = (room: IRoom): void => {
    //     if (!(JSON.stringify(room) in userWishlist.rooms.results)) {
    //         dispatch(usersSlice.actions.updateWishlist(room))
    //     } else {
    //         document.write("smth wrong in wishlistUpdate func in RoomsComponent")
    //     }
    // }

    console.log("RoomsComponent:\n", "roomsPag:\n", roomsPag)

    return (
        <div className={styles.rooms_box}>
            {
                roomsPag ?
                    roomsPag?.data.map((room: IRoom) => <RoomCardComponent key={room.id} room={room}
                                                                           // wishlistUpdate={wishlistUpdate}
                    />)
                    : <h3>Loading...</h3>
            }

        </div>
    );
};
