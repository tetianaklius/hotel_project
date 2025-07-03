import {urls} from "../constants/urls";
import {apiService} from "./api.service";


const _accessTokenKey = "access";
const _refreshTokenKey = "refresh";

interface IProps {
    refresh: string,
    access: string
}

const refreshService = {
    refresh: async () => {
        const token: string | null = authService.getRefreshToken()
        if (token) {
            const {data} = await apiService.post(urls.auth.refresh, {"refresh": token});
            localStorage.setItem(_accessTokenKey, data.access);
            localStorage.setItem(_refreshTokenKey, data.refresh);
            return data;
        }
    }
}

const authService = {
    async activate(token: string | null) {
        const {data} = await apiService.patch(urls.auth.activate + token)
        return data;
    },

    async login(user: object) {
        const {data} = await apiService.post(urls.auth.login, user);
        this.setTokens(data);
    },

    logout() {
        localStorage.removeItem(_accessTokenKey)
        localStorage.removeItem(_refreshTokenKey)
    },

    setTokens({refresh, access}: IProps) {
        localStorage.setItem(_accessTokenKey, access);
        localStorage.setItem(_refreshTokenKey, refresh);
    },

    getAccessToken() {
        return localStorage.getItem(_accessTokenKey);
    },

    getRefreshToken() {
        return localStorage.getItem(_refreshTokenKey);
    },
};

export {
    authService,
    refreshService,
};