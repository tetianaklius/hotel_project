import React from 'react';

// @ts-ignore  //todo
import styles from "./WelcomeComponent.module.css";


export const WelcomeComponent = () => {
    return (
        <div className={styles.main}>
            <div className={styles.info_block}>
                <div className={styles.text_mini}>

                </div>
                <div className={styles.text_title}>
                    WelcomePage
                </div>
                <div className={styles.button_box}>
                    <button>Переглянути</button>
                </div>
            </div>
        </div>
    );
};