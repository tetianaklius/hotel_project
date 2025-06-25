import React from "react";
import {createBrowserRouter, Navigate, RouteObject,} from "react-router-dom";

import {MainLayout} from "../layouts/MainLayout/MainLayout";
import {RegistrationPage} from "../pages/RegistrationPage/RegistrationPage";
import {LoginPage} from "../pages/LoginPage/LoginPage";
import {WelcomePage} from "../pages/WelcomePage/WelcomePage";
import {RoomsPage} from "../pages/RoomsPage/RoomsPage";
import {RoomDetailsPage} from "../pages/RoomDetailsPage/RoomDetailsPage";
import {BookingPage} from "../pages/BookingPage/BookingPage";
import {SearchRoomsPage} from "../pages/SearchRoomsPage/SearchRoomsPage";
import {ErrorLayout} from "../layouts/ErrorLayout/ErrorLayout";


const routes: RouteObject[] =
    [
        {
            path: "/",
            element: <MainLayout/>,
            // element: <div>HELLO</div>,
            errorElement: <ErrorLayout/>,
            children: [
                {index: true, element: <Navigate to={"home"}/>},
                {path: "login", element: <LoginPage/>},
                {path: "registration", element: <RegistrationPage/>},
                {path: "home", element: <WelcomePage/>},

                {path: "rooms", element: <RoomsPage/>},
                {path: "rooms/search", element: <SearchRoomsPage/>},
                {path: "rooms/room_details/:id", element: <RoomDetailsPage/>},

                {path: "booking", element: <BookingPage/>},

            ]
        }
    ]

export const router = createBrowserRouter(routes);