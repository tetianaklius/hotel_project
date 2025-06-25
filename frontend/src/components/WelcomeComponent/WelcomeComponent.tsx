import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

import styles from "./WelcomeComponent.module.css";

export const WelcomeComponent: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.main}>
            <div className={styles.info_block}>
                <div className={styles.text_mini}>
                    Welcome to
                </div>
                <div className={styles.text_title}>
                    SONTSESIAINO
                </div>
                <div className={styles.button_box}>
                    <button className={styles.button_review}
                            onClick={() => {
                                navigate("/rooms");
                            }}
                    >Переглянути
                    </button>
                </div>
            </div>
        </div>
    );
};
