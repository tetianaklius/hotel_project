import React from 'react';

// @ts-ignore
import styles from "./WelcomePage.module.css"
import {WelcomeComponent} from "../../components/WelcomeComponent/WelcomeComponent";


export const WelcomePage = () => {
    return (
        <div className={styles.main}>
            <WelcomeComponent/>
        </div>
    );
};
