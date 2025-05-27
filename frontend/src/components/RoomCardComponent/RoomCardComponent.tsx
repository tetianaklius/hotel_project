import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

// @ts-ignore //todo
import styles from "./RoomCardComponent.module.css";
import {IRoom} from "../../models/Rooms/IRoom";
import {useAppSelector} from "../../redux/store";


interface Props {
    room: IRoom;
}

export const RoomCardComponent: FC<Props> = ({room}) => {
    const navigate = useNavigate();
    const {useDarkTheme} = useAppSelector(state => state.roomsSlice)

    return (
        <div
            className={useDarkTheme ? styles.room_card_dark_theme : styles.room_card_light_theme}
            onClick={() => {
                navigate(`/room_details/${room.id.toString()}`, {state: {room: room}});
            }}>
            <div className={styles.title}>
                {room.title}
            </div>
            <div>
                //todo
            </div>
            <div>
                //todo
            </div>
             <div>
                //todo
            </div>
        </div>
    );
};
