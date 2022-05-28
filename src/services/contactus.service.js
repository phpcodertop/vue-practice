import {http} from "@/utils/axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
const toast = useToast();

const contactUsService = {
    sendMessage(data) {
        return http.post('/contact-us', data, { headers: authHeader() })
            .then((response) => {
                toast.success(response.data);
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
};

export default contactUsService;
