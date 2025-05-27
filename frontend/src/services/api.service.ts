import axios from "axios";

import {baseURL} from "../constants/urls";


// const apiServiceAllowAny = axios.create({baseURL})  // todo
const apiService = axios.create({baseURL})
const apiServiceRefresh = axios.create({baseURL})

apiService.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem("access");

        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request
    },
    (error) => {
        return Promise.reject(error);
    }
)


export {
    apiService,
    // apiServiceAllowAny,
    apiServiceRefresh,
}