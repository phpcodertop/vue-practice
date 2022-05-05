import {http} from "@/utils/axios";

import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
const toast = useToast();

const todosService = {
    getAll() {
        return http
            .get('/todos', { headers: authHeader() })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    },
    addNew(data) {
        return http
            .post('/todos', {'content' : data}, { headers: authHeader() })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                toast.error(error);
            });
    },
    toggleStatus(todo) {
        return http
            .patch('/todos/' + todo.id, {
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
