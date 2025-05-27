import React, {FC} from 'react';

import {RoomCardComponent} from "../RoomCardComponent/RoomCardComponent";
import {useAppSelector} from "../../redux/store";
// @ts-ignore  //todo
import styles from "./RoomsComponent.module.css";

export const RoomsComponent: FC = () => {
    const {roomsPag} = useAppSelector(state => state.roomsSlice);

    return (
        <div className={styles.rooms_box}>
            {
                roomsPag ?
                    roomsPag.results.map(room => <RoomCardComponent key={room.id} room={room}/>)
                    : <h3>Loading...</h3>
            }
        </div>
    );
};
