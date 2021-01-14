import {fetchUtils} from "react-admin";
import config from "./config";

const authProvider = {
    // authentication
    login: ({ username, password }) => fetchUtils.fetchJson(`${config.serverUrl}/admin/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    }).then((data) => {
        if (data.status === 200) {
            localStorage.setItem('auth', data.body);

            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }),
    checkError: error => Promise.resolve(),
    checkAuth: () => {
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    getIdentity: (prop) => {
        console.log('getIdentity:', prop)

        try {
            const { id, nickname } = JSON.parse(localStorage.getItem('auth'));
            console.log('identity:', { id, nickname })

            return Promise.resolve({ id, fullName: nickname, avatar: null });
        } catch (error) {
            return Promise.reject(error);
        }
    },
    // authorization
    getPermissions: params => Promise.resolve(),
};

export default authProvider;
