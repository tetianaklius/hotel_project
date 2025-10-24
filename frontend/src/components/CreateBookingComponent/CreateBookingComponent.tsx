import React from "react";
import {useForm} from "react-hook-form";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
// import {RangeCalendar} from "../Calendar/RangeCalendar";
import {IBooking} from "../../models/Bookings/IBooking";
import {bookingService} from "../../services/booking.api.service";
import {useAppDispatch} from "../../redux/store";
import {bookingsActions, bookingsSlice} from "../../redux/slices/bookingSlice";
import styles from "../CreateBookingComponent/CreateBookingComponent.module.css";
import "./CreateBookingComponent.module.css";
// import {today, getLocalTimeZone} from "@internationalized/date";
// import {DateRangePickerComponent} from "@syncfusion/ej2-react-calendars";
// import {DateEndComponent, DateStartComponent} from "../Calendar/mui/picker";
// import {MyDateRangePicker} from "../Calendar/mui/RANGE_picker";
import {DateEndComponent, DateStartComponent} from "../Calendar/mui/picker";
import dayjs from "dayjs";


export const CreateBookingComponent = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IBooking>({
        mode: "all",
        // resolver: joiResolver(searchReqValidator)  // todo
    });
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const room = location.state.room;
    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = React.useState<dayjs.Dayjs>(dayjs(Date.now()));
    const [endDate, setEndDate] = React.useState<dayjs.Dayjs>(dayjs(Date.now()));
    const [error, setError] = React.useState("");

    const save = async (new_booking: IBooking) => {
        try {
            new_booking["room"] = room.id;
            // new_booking["persons"] = Number(new_booking["persons"]);
            new_booking["start_date"] = startDate.format("YYYY-MM-DD");
            new_booking["end_date"] = endDate.format("YYYY-MM-DD");
            console.log("frontend", "\n", new_booking, "\n", "************")
            await bookingService.create(new_booking).then(data => {
                dispatch(bookingsSlice.actions.setCurrentBooking(new_booking));
                bookingsActions.createBooking(new_booking);
                navigate("/bookings/my_bookings");
            })
        } catch (err) {
            // setError(([{"err_message": err.message}]) + JSON.stringify([{"err_message": err.response.data}]))
            setError(JSON.stringify([{"err_message": err.message}]));

        }
    }

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
                               defaultValue={room.id} {...register("room")}/>
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
                {/*3*/}
                <div>
                    <div>
                        Дата заїзду
                    </div>
                    <DateStartComponent startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                        setEndDate={setEndDate}/>
                </div>
                <div>
                    <div>
                        Дата виїзду
                    </div>
                    <DateEndComponent startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                      setEndDate={setEndDate}/>
                </div>
                {/*3*/}
                {/*4*/}
                {/*<MyDateRangePicker/>*/}
                {/*4*/}

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
                <div>{error}</div>
                <div>{errors.persons && <span>{errors.persons.message}</span>}</div>
                <div>{errors.comment && <span>{errors.comment.message}</span>}</div>
            </form>
        </div>
    );
};
