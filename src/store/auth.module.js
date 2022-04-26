import AuthService from "@/services/auth.service";
const access_token = localStorage.getItem('access_token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = access_token ? { loggedIn: true, user } : { loggedIn: false, user: null };

const authModule = {
    state: initialState,
    mutations: {
        SET_LOGIN_SUCCESS(state) {
            state.loggedIn = true;
        },
        SET_LOGIN_FAILED(state) {
            state.user = null;
            state.loggedIn = false;
        },
        SET_USER(state, user) {
            state.user = user;
        }
    },
    actions: {
        login({ commit, dispatch  }, data) {
            return AuthService.login(data).then(() =>  {
                dispatch('me');
                commit('SET_LOGIN_SUCCESS');
            }).catch((error) => {
                commit('SET_LOGIN_FAILED');
                throw error;
            });
        },
        register({ commit, dispatch }, data) {
            return AuthService.register(data).then(()=>  {
                dispatch('me');
                commit('SET_LOGIN_SUCCESS');
            }).catch((error) => {
                commit('SET_LOGIN_FAILED');
                throw error;
            });
        },
        logout({ commit }) {
            return AuthService.logout().then(() => {
                commit('SET_LOGIN_FAILED');
            }).catch(() => {
                commit('SET_LOGIN_FAILED');
            });
        },
        me({ commit }) {
            return AuthService.me().then((user) => {
                commit('SET_USER', user);
            }).catch(() => {
            });
        }
    }
};

export default authModule;
