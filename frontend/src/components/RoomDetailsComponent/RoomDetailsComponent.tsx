import React, {FC} from 'react';
import {useLocation} from "react-router-dom";

import {IRoom} from "../../models/Rooms/IRoom";
import {useAppSelector} from "../../redux/store";
// @ts-ignore //todo
import styles from "./RoomDetailsComponent.module.css";

export const RoomDetailsComponent: FC = () => {
    const location = useLocation();
    const room: IRoom = location.state.room;
    const {useDarkTheme} = useAppSelector(state => state.roomsSlice);
    const {roomDetailed} = useAppSelector(state => state.roomsSlice);

    return (
        <div>
            <div className={styles.room_details_box}>
                {room?.id}
                {room?.title}
                {/*{room?.room_type}*/}
                {/*{room?.category}*/}
                {room?.desc}
            </div>
            <div>

            </div>
        </div>
    );
};
