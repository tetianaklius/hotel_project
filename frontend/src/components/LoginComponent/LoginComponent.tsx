import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

import {authService} from "../../services/auth.api.service";
import styles from "./LoginComponent.module.css";
import {useAppDispatch} from "../../redux/store";
import {usersActions} from "../../redux/slices/usersSlice";
import {IUser} from "../../models/Users/IUser";
// import {useAppDispatch} from "../../redux/store";


export const LoginComponent = () => {
    const location = useLocation();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    }, [error]);

    const onSubmit = async (user: object) => {
        try {
            await authService.login(user)
            console.log("login done")
            dispatch(usersActions.setCurrentUser(user as IUser))
            navigate("/rooms");
        } catch (err) {
            setError(JSON.stringify([{"err_message": err.message}, err.response.data]))
        }
    };

    return (
        <div className={styles.login_box}>
            <h2>Login</h2>
            <form onSubmit={() => handleSubmit(onSubmit)} className={styles.login_form}>
                <label className={styles.input_wrap}>
                    <input type="text" id={styles.input_1} defaultValue={location.state?.email}
                           placeholder={"email"} {...register("email")}/>
                </label>
                <label className={styles.input_wrap}>
                    <input type="text" id={styles.input_2}
                           placeholder={"password"} {...register("password")}/>
                </label>
                <button className={styles.login_button}>login</button>
                <div className={styles.error_msg}>{error}</div>
                <div>{errors.email && <span>{errors.email.message}</span>}</div>
                <div>{errors.password && <span>{errors.password.message}</span>}</div>
            </form>
        </div>
    );
};