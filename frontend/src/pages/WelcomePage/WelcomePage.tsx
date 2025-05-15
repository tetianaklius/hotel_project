import React from 'react';

import styles from "./WelcomePage.module.css"

export const WelcomePage = () => {
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
