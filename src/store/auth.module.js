import AuthService from "@/services/auth.service";
import moment from "moment";
const access_token = localStorage.getItem('access_token');
const expires_in = localStorage.getItem('expires_in');
const user = JSON.parse(localStorage.getItem('user'));
const expireTime = moment(expires_in).format();

const initialState = access_token ?
    { loggedIn: true, user, expires_in: expireTime } :
    { loggedIn: false, user: null, expires_in: null };

const authModule = {
    state: initialState,
    mutations: {
        SET_LOGIN_SUCCESS(state, expiryIn) {
            state.loggedIn = true;
            const currentTime = moment();
            const newTime = currentTime.add(expiryIn, 'minutes');

            state.expires_in = newTime.format();
        },
        SET_LOGIN_FAILED(state) {
            state.user = null;
            state.loggedIn = false;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        CLEAR_STATE(state) {
            state.user = null;
            state.loggedIn = false;
            state.expires_in = null;
            localStorage.clear();
        }
    },
    actions: {
        login({ commit, dispatch  }, data) {
            return AuthService.login(data).then((res) =>  {
                const expiresIn = res.expires_in;
                dispatch('me');
                commit('SET_LOGIN_SUCCESS', expiresIn);
            }).catch((error) => {
                commit('SET_LOGIN_FAILED');
                throw error;
            });
        },
        register({ commit, dispatch }, data) {
            return AuthService.register(data).then((res)=>  {
                const expiresIn = res.expires_in;
                dispatch('me');
                commit('SET_LOGIN_SUCCESS', expiresIn);
            }).catch((error) => {
                commit('SET_LOGIN_FAILED');
                throw error;
            });
        },
        logout({ commit }) {
            commit('CLEAR_STATE');
        },
        me({ commit }) {
            return AuthService.me().then((user) => {
                commit('SET_USER', user);
            }).catch(() => {
            });
        },
        updateProfile({commit}, data) {
            return AuthService.updateProfile(data).then((user) => {
                commit('SET_USER', user);
            }).catch(() => {
            });
        }
    }
};

export default authModule;
