import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {authService} from "../../services/auth.api.service";
import styles from "./HeaderComponent.module.css";

const HeaderComponent: FC = () => {
    const navigate = useNavigate();

    const BackButton = () => {
        navigate(-1);
    }

    const logOut = () => {
        authService.logout();
        navigate("/login")
    }

    return (
        <div className={styles.header_common}>
            {/*<div*/}
            {/*    onClick={() => BackButton()}*/}
            {/*    className={styles.back_button}*/}
            {/*>Назад&laquo;&laquo;&laquo;*/}
            {/*</div>*/}
            <div className={styles.logo_box}
                 onClick={() => {
                     navigate("home");
                 }}>
                <img src="" alt="логотип сайту"/>
            </div>
            <div className={styles.navbar}>
                <div className={styles.navbar_item}
                     onClick={() => {
                         navigate("rooms");
                     }}>
                    Номери
                </div>
                <div className={styles.navbar_item}>
                    Забронювати (на сторінку пошуку номерів)
                </div>
                {/*<div className={styles.navbar_item}>*/}
                {/*    Акції*/}
                {/*</div>*/}
                <div className={styles.navbar_item}>
                    Локація (до ґуґл-карти)
                </div>
                <div className={styles.navbar_item}>
                    Телефон (розгорточка і є кнопка скопіювати)
                </div>
                {/*<div className={styles.navbar_item}>*/}
                {/*    Мова (укр, англ)*/}
                {/*</div>*/}
                {/*<div className={styles.navbar_item}>*/}
                {/*    тема? світла, темна*/}
                {/*</div>*/}
                {user.profile.name}
                <Link to="/profile"> Profile </Link>
                <button onClick={logOut}> LogOut</button>

            </div>

        </div>
    );
};

export default HeaderComponent;