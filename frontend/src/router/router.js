import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {ErrorLayout} from "../layouts/ErrorLayout/ErrorLayout";
import {RegistrationPage} from "../pages/RegistrationPage/RegistrationPage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {RoomsPage} from "../pages/RoomsPage/RoomsPage";
import {RoomDetailsPage} from "../pages/RoomDetailsPage/RoomDetailsPage";
import {BookingPage} from "../pages/BookingPage/BookingPage";
import {SearchRoomsPage} from "../pages/SearchRoomsPage/SearchRoomsPage";


export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout/>,
            errorElement: <ErrorLayout/>,
            children: [
                {path: "login",element: <LoginPage/>},
                {path: "registration",element: <RegistrationPage/>},
                {path: "home",element: <WelcomePage/>},

                {path: "rooms",element: <RoomsPage/>},
                {path: "rooms/search",element: <SearchRoomsPage/>},
                {path: "rooms/room_details/:id", element: <RoomDetailsPage/>},

                {path: "booking",element: <BookingPage/>},

            ]
        }
    ]
)