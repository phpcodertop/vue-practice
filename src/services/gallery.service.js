import {http} from "@/utils/axios";
import {useToast} from "vue-toastification";
const toast = useToast();

const galleryService = {

    async getImages() {
        return http.get('/gallery')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

};

export default galleryService;
