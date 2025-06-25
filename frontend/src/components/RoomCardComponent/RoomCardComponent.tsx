import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {IRoom} from "../../models/Rooms/IRoom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {usersActions} from "../../redux/slices/usersSlice";
import styles from "./RoomCardComponent.module.css";


interface Props {
    room: IRoom;
    wishlistUpdate: (room: IRoom) => void;
}

export const RoomCardComponent: FC<Props> = ({room, wishlistUpdate}) => {
    const navigate = useNavigate();
    const {useDarkTheme} = useAppSelector(state => state.roomsSlice)
    const {currentUser, userWishlist} = useAppSelector(state => state.usersSlice)
    const dispatch = useAppDispatch();
    const {rooms} = useAppSelector(state => state.usersSlice.userWishlist)

    return (
        <div className={useDarkTheme ? styles.room_card_dark_theme : styles.room_card_light_theme}
             onClick={() => {
                 navigate(`/room_details/${room.id.toString()}`, {state: {room: room, wishlistUpdate: wishlistUpdate}});
                 dispatch(usersActions.saveUserWishlist(rooms));
             }}>

            <div className={styles.title}>
                {room.title}
            </div>

            {currentUser.profile.name &&
                <button id={"wishlistButton"}
                        onClick={() => wishlistUpdate(room)}
                        title={"Add to wishlist"}
                        className={styles.wishlist_button}>
                    &#9825;
                </button>
            }
        </div>
    );
};
