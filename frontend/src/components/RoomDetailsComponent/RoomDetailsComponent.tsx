import React, {FC} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

import {IRoom} from "../../models/Rooms/IRoom";
import styles from "./RoomDetailsComponent.module.css";

interface IProps {
    roomDetailed: IRoom
}

export const RoomDetailsComponent: FC<IProps> = ({roomDetailed}) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div>
            <div className={styles.room_details_box}>
                <div>{roomDetailed?.id}</div>
                <div>{roomDetailed?.title}</div>
                {/*<div>{roomDetailed?.room_type}</div>*/}
                {/*<div>{roomDetailed?.category}</div>*/}
                <div>{roomDetailed?.desc}</div>
                <div>{roomDetailed?.area}</div>
                <div>{roomDetailed?.beds_num}</div>
                <div>{roomDetailed?.floor}</div>
                <div>{roomDetailed?.price}</div>
            </div>
            <div>
                <button onClick={() => navigate("/bookings/new", {state: {room: roomDetailed}})}>
                    Book the room
                </button>
                <button>Add to wishlist</button>
            </div>
        </div>
    );
};
