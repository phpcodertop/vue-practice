import axios from "axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";

const apiUrl = process.env.VUE_APP_API_URL;
const toast = useToast();

const AuthService = {
  login(data) {
    return axios.post(apiUrl + '/auth/login', data)
    .then((response) => {
      localStorage.setItem('access_token', response.data.access_token);
      return response.data;
    })
    .catch((error) => {
      localStorage.removeItem('access_token');
      toast.error(error.response.data.error);
      throw error.response.data.error;
    });
  },
  register(data) {
    return axios.post(apiUrl + '/auth/register', data)
        .then((response) => {
          localStorage.setItem('access_token', response.data.access_token);
          return response.data;
        })
        .catch((error) => {
            localStorage.removeItem('access_token');
            toast.error('Error registering new account.');
            throw error.response;
        });
  },
  me() {
      return axios.post(apiUrl + '/auth/me', {}, { headers: authHeader() })
          .then((response) => {
              localStorage.setItem('user', JSON.stringify(response.data));
              return Promise.resolve(response.data);
          })
          .catch((error) => {
              toast.error('Something happened while getting userdata.');
              throw error;
          });
  },
  logout() {
      return axios.post(apiUrl + '/auth/logout', {}, { headers: authHeader() })
          .then(() => {
              localStorage.clear();
          })
          .catch((error) => {
              toast.error('Something happened while logout.');
              throw error;
          });

  }
};

export default AuthService;
