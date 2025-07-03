import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";

import styles from "../CreateBookingComponent/CreateBookingComponent.module.css";
import {IBooking} from "../../models/Bookings/IBooking";
import {bookingService} from "../../services/booking.api.service";
import {useAppDispatch} from "../../redux/store";
import {bookingsSlice} from "../../redux/slices/bookingSlice";


export const CreateBookingComponent = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IBooking>({
        mode: "all",
        // resolver: joiResolver(searchReqValidator)  // todo
    });

    // const {id} = useParams();
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const room = location.state.room;
    const dispatch = useAppDispatch();

    const save = async (new_booking: IBooking) => {
        try {
            new_booking["room"] = room;
            await bookingService.create(new_booking).then(data => {
                dispatch(bookingsSlice.actions.setCurrentBooking(new_booking));
                navigate("/bookings/my_bookings");
            })
        } catch (err) {
            // setError(JSON.stringify([{"err_message": err.message}]) + JSON.stringify([{"err_message": err.response.data}]))

        }
    }
    // const resetForm = () => {
    //     let form1 = document.forms[0];
    //     form1.reset();
    // }

    useEffect((): void => {
    }, [room]);


    return (
        <div className={styles.component_wrap}>
            <div>
                {room.photo}
            </div>
            <div>
                {room.title}
            </div>
            <form className={styles.form_wrap} onSubmit={handleSubmit(save)}>
                {/*--room id--*/}
                <div className={styles.label_wrap}>
                    <label className={styles.input_wrap}>
                        <input id={styles.input_room} type={"hidden"} placeholder={`${room.title}`} disabled={true}
                               defaultValue={room.id} {...register("room_id")}/>
                    </label>
                </div>
                {/*--persons--*/}
                <div>
                    <label className={styles.input_wrap}>Кількість осіб
                        <input type="text" required
                               defaultValue={"2"} {...register("persons")}/>
                    </label>
                </div>
                {/*--dates--*/}
                {/*<label className={styles.select_wrap}>*/}
                {/*    <select onChange={onChangePostLabel} size={10} value={getValuePostLabel()?.name}>*/}
                {/*        {postLabels.map((opts, i) => <option key={i}>{opts.name}</option>)}*/}
                {/*    </select>*/}
                {/*</label>*/}

                {/*--comment--*/}
                <div>
                    <label className={styles.input_wrap}>Ваш коментар
                        <input id={styles.input_comment} type="text" placeholder={"..."} {...register("comment")}/>
                    </label>
                </div>
                {/*--submit--*/}
                <div>
                    <button className={styles.confirm_button} onClick={() => handleSubmit(save)}
                    >Забронювати
                    </button>
                </div>
                {/*errors*/}
                <div>{errors.persons && <span>{errors.persons.message}</span>}</div>
                <div>{errors.comment && <span>{errors.comment.message}</span>}</div>
            </form>
        </div>
    );
};
