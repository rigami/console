import {fetchUtils} from "react-admin";
import config from "./config";

const authProvider = {
    // authentication
    login: ({ username, password }) => {

        const headers = new Headers();
        const authData = localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth'));

        headers.append('Device-Type', 'console');
        headers.append('Device-Sign', authData?.deviceSign || '');
        headers.append('Device-Platform', navigator.userAgentData.platform);

        return fetchUtils.fetchJson(`${config.serverUrl}/v1/auth/login/credentials`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ username, password }),
        }).then((data) => {
            if (data.status === 200) {
                localStorage.setItem('auth', JSON.stringify({
                    id: data.json.userId,
                    username: data.json.username,
                    deviceSign: data.json.deviceSign,
                    authToken: data.json.authToken,
                    accessToken: data.json.accessToken,
                    refreshToken: data.json.refreshToken,
                    expiredTokenTimeout: null,
                }));

                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        })
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem('auth')
        ? Promise.resolve()
        : Promise.reject(),
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    getIdentity: (prop) => {
        console.log('getIdentity:', prop)

        try {
            const { id, username } = JSON.parse(localStorage.getItem('auth'));
            console.log('identity:', { id, username })

            return Promise.resolve({ id, fullName: username, avatar: null });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // authorization
    getPermissions: params => Promise.resolve(),
};

export default authProvider;
