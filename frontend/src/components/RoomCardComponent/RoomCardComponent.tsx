import React, {FC} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import {IRoom} from "../../models/Rooms/IRoom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {roomsActions} from "../../redux/slices/roomsSlice";
import styles from "./RoomCardComponent.module.css";


interface IProps {
    room: IRoom;
    // wishlistUpdate: (room: IRoom) => void;
}

export const RoomCardComponent: FC<IProps> = ({
                                                  room,
                                                  // wishlistUpdate
                                              }) => {
    const navigate: NavigateFunction = useNavigate();
    const {useDarkTheme} = useAppSelector(state => state.roomsSlice)
    // const {currentUser, userWishlist} = useAppSelector(state => state.usersSlice)
    const dispatch = useAppDispatch();
    console.log("RoomCardComponent")

    return (
        <div className={useDarkTheme ? styles.room_card_dark_theme : styles.room_card_light_theme}
             onClick={() => {
                 // navigate(`/room_details/${room.id}`, {state: {room: room, wishlistUpdate: wishlistUpdate}});
                 dispatch(roomsActions.saveCurrentRoom(room));
                 navigate(`/rooms/room_details/${room.id}`);

                 // dispatch(usersActions.saveUserWishlist(rooms));
             }}>

            <div className={styles.title}>
                {room.title}
            </div>

            {/*{currentUser.profile.name &&*/}
            {/*    <button id={"wishlistButton"}*/}
            {/*            onClick={() => wishlistUpdate(room)}*/}
            {/*            title={"Add to wishlist"}*/}
            {/*            className={styles.wishlist_button}>*/}
            {/*        &#9825;*/}
            {/*    </button>*/}
            {/*}*/}
        </div>
    );
};
