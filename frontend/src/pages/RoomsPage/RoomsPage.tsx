import React, {useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../redux/store";
import {ISearchParams} from "../../models/Search/SearchParams";
import {roomsActions} from "../../redux/slices/roomsSlice";
import {RoomsComponent} from "../../components/RoomsComponent/RoomsComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";

import styles from "./RoomsPage.module.css";


export const RoomsPage = () => {
    const dispatch = useAppDispatch();
    const {currentPage} = useAppSelector(state => state.roomsSlice);

    const storageCurrentPage = localStorage.getItem("pageCurrent");
    const params: ISearchParams = {
        page: storageCurrentPage,
        language: "uk-UA",
        // sort_by: "vote_count.desc"  // TODO
    }

    useEffect((): void => {
        dispatch(roomsActions.loadAllVisibleRooms());

    }, [currentPage]);

    console.log("RoomsPage")

    return (
        <div className={styles.main}>
            <PaginationComponent/>
            <RoomsComponent/>
            <PaginationComponent/>
        </div>
    );
};

