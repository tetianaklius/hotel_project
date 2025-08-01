import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {authService} from "../../services/auth.api.service";
import styles from "./HeaderComponent.module.css";
import {useAppSelector} from "../../redux/store";

export const HeaderComponent: FC = () => {
    const navigate = useNavigate();
    const {currentUserProfile} = useAppSelector(state => state.usersSlice);

    const BackButton = () => {
        navigate(-1);
    }

    const logOut = () => {
        authService.logout();
        navigate("/login")
    }

    return (
        <div className={styles.header_common}>
            <div
                onClick={() => BackButton()}
                style={{background: "white 0.5"}}
                // className={styles.back_button}
            >Назад&laquo;&laquo;&laquo;
            </div>
            {/*logotype*/}
            <div className={styles.logo_box}
                 onClick={() => {
                     navigate("home");
                 }}>
                <img src="" alt="логотип сайту"/>
            </div>

            {/*navbar*/}
            <div className={styles.navbar}>
                {/*rooms*/}
                <div className={styles.navbar_item}
                     onClick={() => {
                         navigate("rooms");
                     }}>
                    Номери
                </div>
                {/*to book*/}
                <div className={styles.navbar_item}>
                    Забронювати (на сторінку пошуку номерів)
                </div>
                {/*location*/}
                <div className={styles.navbar_item}>
                    Локація (до ґуґл-карти)
                </div>
                {/*phone*/}
                <div className={styles.navbar_item}>
                    Телефон (розгорточка і є кнопка скопіювати)
                </div>
                {/*language*/}
                <div className={styles.navbar_item}>
                    Мова (укр, англ)
                </div>
                {/*// todo*/}
                {/*mode*/}
                <div className={styles.navbar_item}>
                    тема
                </div>
                {/*// todo*/}
                {currentUserProfile ?
                    // <div className={styles.login_items}>
                    <div className={styles.account_box}>
                        <div className={styles.navbar_item}
                             onClick={() => {
                                 navigate("/profile");
                             }}>Мій акаунт
                        </div>
                        <div className={styles.navbar_item}
                             onClick={() => {
                                 logOut()
                             }}>Вийти
                        </div>
                    </div>
                    :
                    <div className={styles.account_box}>
                        <div
                             onClick={() => {
                                 navigate("/login");
                             }}>Увійти
                        </div>
                        <div
                             onClick={() => {
                                 navigate("/registration");
                             }}>Зареєструватись
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
