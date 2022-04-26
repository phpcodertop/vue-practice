import axios from "axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
const apiUrl = process.env.VUE_APP_API_URL;
const toast = useToast();

const todosService = {
    getAll() {
        return axios
            .get(apiUrl + '/todos', { headers: authHeader() })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                toast.error(error);
            });
    },
    addNew(data) {
        return axios
            .post(apiUrl + '/todos', {'content' : data}, { headers: authHeader() })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                toast.error(error);
            });
    },
    toggleStatus(todo) {
        return axios
            .patch(apiUrl + '/todos/' + todo.id, {
                'completed' : ! todo.completed
            }, { headers: authHeader() })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                toast.error(error);
            });
    }
};

export default todosService;
