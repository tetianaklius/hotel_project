import React from "react";

import {CreateBookingComponent} from "../../components/CreateBookingComponent/CreateBookingComponent";
import styles from "../CreateBookingPage/CreateBookingPage.module.css";

export const CreateBookingPage = () => {
    return (
        <div className={styles.main}>
            <CreateBookingComponent/>
        </div>
    );
};
