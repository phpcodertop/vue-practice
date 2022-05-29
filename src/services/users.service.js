import {http} from "@/utils/axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
const toast = useToast();

const usersService = {
    getPage(page) {
        return http.get('/users?page=' + page, { headers: { ...authHeader() }})
            .then(response => {
                return response.data;
            }).catch(error => {
                toast.error('Something happened while getting users data.');
                return error.message;
            });
    },
    getUser(id) {
        return http.get('/users/' + id, { headers: { ...authHeader() }})
            .then(response => {
                return response.data;
            }).catch(error => {
                toast.error('Something happened while getting user data.');
                return error.message;
            });
    },
    addUser(data) {
        return http.post('/users', data, { headers: { ...authHeader() } })
            .then(response => {
                toast.success('User Added Successfully.');
                return response.data;
            }).catch(error => {
                throw error.response.data;
            });
    },
    updateUser(id, data) {
        return http.patch('/users/' + id, data, { headers: { ...authHeader() } })
            .then(response => {
                toast.success('User Updated Successfully.');
                return response.data;
            }).catch(error => {
                throw error.response.data;
            });
    },
    deleteUser(id) {
        return http.delete('/users/' + id, { headers: { ...authHeader() }})
            .then(response => {
                toast.success(response.data);
                return response.data;
            }).catch(error => {
                toast.error(error.response.data);
            });
    }
};

export default usersService;
