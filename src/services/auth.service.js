import {http} from "@/utils/axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
import moment from "moment";

const toast = useToast();

const AuthService = {
    handleRequest: function (response) {
        localStorage.setItem('access_token', response.data.access_token);
        const expireTime = moment().add(response.data.expires_in, 'm').format();
        localStorage.setItem('expires_in', expireTime);
        return response.data;
    },
    login(data) {
        return http.post('/auth/login', data)
        .then((response) => {
            return this.handleRequest(response);
        })
        .catch((error) => {
          localStorage.removeItem('access_token');
          toast.error(error.response.data.error);
          throw error.response.data.error;
        });
  },
  register(data) {
    return http.post('/auth/register', data)
        .then((response) => {
            return this.handleRequest(response);
        })
        .catch((error) => {
            localStorage.removeItem('access_token');
            toast.error('Error registering new account.');
            throw error.response;
        });
  },
  me() {
      return http.post('/auth/me', {}, { headers: authHeader() })
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
      return http.post('/auth/logout', {}, { headers: authHeader() })
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
