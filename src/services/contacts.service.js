import {http} from "@/utils/axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
const toast = useToast();

const ContactsService = {
    addNewContact(data) {
        return http.post('/contacts', data, { headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            } })
            .then((response) => {
                toast.success(response.data.message);
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    },
    deleteContact(id) {
        return http.delete('/contacts/'+ id, { headers: authHeader() })
            .then((response) => {
                toast.success('Contact Deleted Successfully.');
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
};

export default ContactsService;
