import {createBrowserRouter, Navigate, RouteObject,} from "react-router-dom";

import {MainLayout} from "../layouts/MainLayout/MainLayout.tsx";
import {RegistrationPage} from "../pages/RegistrationPage/RegistrationPage.tsx";
import {LoginPage} from "../pages/LoginPage/LoginPage.tsx";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage.tsx";
import {RoomsPage} from "../pages/RoomsPage/RoomsPage.tsx";
import {RoomDetailsPage} from "../pages/RoomDetailsPage/RoomDetailsPage.tsx";
import {BookingPage} from "../pages/BookingPage/BookingPage.tsx";
import {SearchRoomsPage} from "../pages/SearchRoomsPage/SearchRoomsPage.tsx";


const routes: RouteObject[] =
    [
        {
            path: "/",
            element: <MainLayout/>,
            // element: <div>HELLO</div>,
            // errorElement: <ErrorLayout/>,
            children: [
                {index: true, element: <Navigate to={"home"}/>},
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

export const router = createBrowserRouter(routes);