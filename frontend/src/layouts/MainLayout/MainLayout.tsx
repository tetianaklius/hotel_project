import React, {FC} from 'react';
import {Outlet} from "react-router-dom";


// import {colorThemes} from "../constants/colorTheme";
// import {useAppSelector} from "../redux/store";

import {HeaderComponent} from "../../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import styles from "./MainLayout.module.css";


export const MainLayout: FC = () => {
    // const {useDarkTheme} = useAppSelector(state => state.genresSlice);  # todo

    return (
        <div
            className={styles.main}
            // style={useDarkTheme
            //     ? colorThemes.dark
            //     : colorThemes.light}
        >
            <HeaderComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>
    );
};
