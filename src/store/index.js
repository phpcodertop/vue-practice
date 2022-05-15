import { createStore } from "vuex";
import todosModule from "@/store/todos.module";
import authModule from "@/store/auth.module";

const store = createStore({
    modules: {
        todos: {
            namespaced: true,
            ...todosModule
        },
        auth: authModule,
    }
});

export default store;
