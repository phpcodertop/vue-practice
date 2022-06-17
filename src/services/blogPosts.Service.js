import { http } from "@/utils/axios";
import {useToast} from "vue-toastification";
import authHeader from "@/services/authHeader.service";
const toast = useToast();

const blogPostsService = {
    getBlogPosts(page) {
        return http.get('/blog?page='+ page, { headers: { ...authHeader() } })
            .then(response => {
                return response.data;
            })
            .catch(error => {
               throw error.errors.data;
            });
    },
    getBlogPost(slug) {
        return http.get('/blog/' + slug, { headers: { ...authHeader() } })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.errors.data;
            });
    },
    addNewBlog(data) {
        return http.post('/blog', data, { headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            } })
            .then((response) => {
                toast.success('Blog Post Created Successfully.');
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    },
    updateBlogPost($slug, data) {
        return http.post('/blog/' + $slug + '?_method=PUT', data, { headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            } })
            .then((response) => {
                toast.success('Blog Post Updated Successfully.');
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    },
    deleteBlogPost($slug) {
        return http.delete('/blog/' + $slug, { headers: {
                ...authHeader(),
            } })
            .then((response) => {
                toast.success('Blog Post Deleted Successfully.');
                return response.data;
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
};

export default blogPostsService;
