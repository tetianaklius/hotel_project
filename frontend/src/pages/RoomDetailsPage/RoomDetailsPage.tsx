import React from "react";

import {RoomDetailsComponent} from "../../components/RoomDetailsComponent/RoomDetailsComponent";
import {useAppSelector} from "../../redux/store";

export const RoomDetailsPage = () => {
    const {roomDetailed} = useAppSelector(state => state.roomsSlice);
    // const {useDarkTheme} = useAppSelector(state => state.roomsSlice);

    return (
        <div>
            <RoomDetailsComponent key={roomDetailed.id} roomDetailed={roomDetailed}/>
            {/*<RoomDetailsComponent/>*/}
        </div>
    );
};
