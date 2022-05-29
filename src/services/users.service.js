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
