import React from "react";
import {createBrowserRouter, Navigate, RouteObject,} from "react-router-dom";

import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {RegistrationPage} from "../pages/RegistrationPage/RegistrationPage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {RoomsPage} from "../pages/RoomsPage/RoomsPage";
import {RoomDetailsPage} from "../pages/RoomDetailsPage/RoomDetailsPage";
import {SearchRoomsPage} from "../pages/SearchRoomsPage/SearchRoomsPage";
import {ErrorLayout} from "../layouts/ErrorLayout/ErrorLayout";
import {CreateBookingPage} from "../pages/CreateBookingPage/CreateBookingPage";
import {MyBookingsPage} from "../pages/MyBookingsPage/MyBookingsPage";
import {BookingsAdminPage} from "../pages/BookingsAdminPage/BookingsAdminPage";
import {ProfilePage} from "../pages/ProfilePage/ProfilePage";


const routes: RouteObject[] =
    [
        {
            path: "/",
            element: <MainLayout/>,
            errorElement: <ErrorLayout/>,
            children: [
                {index: true, element: <Navigate to={"home"}/>},
                {path: "login", element: <LoginPage/>},
                {path: "registration", element: <RegistrationPage/>},
                {path: "home", element: <WelcomePage/>},
                {path: "profile", element: <ProfilePage/>},

                {path: "rooms", element: <RoomsPage/>},
                {path: "rooms/search", element: <SearchRoomsPage/>},
                {path: "rooms/room_details/:id", element: <RoomDetailsPage/>},

                {path: "bookings/new", element: <CreateBookingPage/>},
                {path: "bookings/my_bookings", element: <MyBookingsPage/>},
                {path: "bookings/admin", element: <BookingsAdminPage/>},

            ]
        }
    ]

export const router = createBrowserRouter(routes);