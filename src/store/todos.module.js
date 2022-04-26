import todosService from "@/services/todos.service";

const todosModule = {
    state: () => ({
        todos: []
    }),
    mutations: {
        SET_TODOS(state, todos){
            state.todos = todos;
        },
        ADD_NEW_TODO(state, todo) {
            state.todos.unshift(todo);
        },
        UPDATE_TODO(state, todo) {
            const index = state.todos.findIndex(t => t.id == todo.id);
            state.todos[index] = todo;
        }
    },
    actions: {
        getTodos({ commit }) {
            todosService.getAll().then((todos) => {
                commit('SET_TODOS', todos);
            })
        },
        addNewTodo({ commit }, data) {
            todosService.addNew(data).then((todo) => {
                commit('ADD_NEW_TODO', todo);
            });
        },
        toggleTodoStatus({ commit }, todo) {
            todosService.toggleStatus(todo).then((todo) => {
                commit('UPDATE_TODO', todo);
            })
        }
    },
};

export default todosModule;
