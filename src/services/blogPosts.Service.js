import { http } from "@/utils/axios";
import authHeader from "@/services/authHeader.service";

const blogPostsService = {
    getBlogPosts(page) {
        return http.get('/blog?page='+ page, { headers: { ...authHeader() } })
            .then(response => {
                return response.data;
            })
            .catch(error => {
               throw error.errors.data;
            });
    }
};

export default blogPostsService;
