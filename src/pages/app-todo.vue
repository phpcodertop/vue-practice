<template>
  <section class="vh-100 gradient-custom">
    <div class="container pb-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">

          <div class="card">
            <div class="card-body p-5">

              <form class="form-inline">
                <div class="form-group mb-2 mr-4 w-75">
                  <input type="text" v-model="newTodoText" class="form-control w-100" id="task" placeholder="New task...">
                </div>
                <button type="submit" @click.prevent="addNewTodo" class="btn btn-info mb-3 ">Add</button>
              </form>

              <!-- Tabs navs -->
              <ul class="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                <li class="nav-item" @click="display('all')" role="presentation">
                  <a class="nav-link" :class="{ 'active' : selectedTab === 'all'}" role="tab">All</a>
                </li>
                <li class="nav-item" @click="display('active')" role="presentation">
                  <a class="nav-link" :class="{ 'active' : selectedTab === 'active'}"  role="tab">Active</a>
                </li>
                <li class="nav-item" @click="display('completed')" role="presentation">
                  <a class="nav-link" :class="{ 'active' : selectedTab === 'completed'}"  role="tab">Completed</a>
                </li>
              </ul>
              <!-- Tabs navs -->

              <!-- Tabs content -->
              <div class="tab-content">
                <div v-show="todosExist" class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                  <ul class="list-group mb-0">
                    <li @click="toggleTodo(todo)" v-for="todo in displayedTodos" :key="todo.id" class="list-group-item d-flex align-items-center border-0 mb-2 " style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" @change="toggleTodo(todo)" value="" aria-label="..." :checked="todo.completed" />
                      <span v-if="!todo.completed">{{ todo.content }}</span>
                      <s v-else>{{ todo.content }}</s>
                    </li>
                  </ul>
                </div>
                <p v-if="!displayedTodos.length" style="text-align: center"> There are no data.</p>
                <div v-show="!todosExist" class="loader"></div>
              </div>
              <!-- Tabs content -->

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { mapState } from 'vuex';
import {useToast} from "vue-toastification";
export default {
  name: "app-todo",
  data() {
    return {
      displayedTodos: [],
      selectedTab: 'all',
      newTodoText: '',
    };
  },
  created() {
    this.$store.dispatch('todos/getTodos');
  },
  methods: {
    addNewTodo() {
      if (this.newTodoText === '') {
        const toast = useToast();
        toast.error('You need to enter todo content.');
        return;
      }
      this.$store.dispatch('todos/addNewTodo', this.newTodoText);
      this.newTodoText = '';
    },
    toggleTodo(todo) {
      this.$store.dispatch('todos/toggleTodoStatus', todo);
      this.display(this.selectedTab);
    },
    display(type) {
      if (type === 'all') {
        this.displayedTodos = this.todos.todos;
      } else if (type === 'completed') {
        this.displayedTodos = this.completedTodos;
      } else {
        this.displayedTodos = this.activeTodos;
      }
      this.selectedTab = type;
    }
  },
  watch: {
    'todos.todos': function () {
      this.displayedTodos = this.todos.todos;
    }
  },
  computed: {
    ...mapState(['todos']),
    todosExist() {
      if (this.todos) {
        return this.todos.todos.length;
      }
      return false;
    },
    completedTodos() {
      return this.todos.todos.filter((todo) => {
        return todo.completed;
      });
    },
    activeTodos() {
      return this.todos.todos.filter((todo) => {
        return !todo.completed;
      });
    }
  }
}
</script>

<style scoped>
.nav-item:hover {
  cursor: pointer;
}
</style>
