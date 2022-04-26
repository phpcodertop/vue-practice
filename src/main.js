import { createApp } from 'vue'
import App from './App.vue'
window.$ = window.jQuery = require("jquery");
import './assets/style.css';
import "vue-toastification/dist/index.css";

import './utils/adminlte';
import Toast from "vue-toastification";

import router from '@/router';
import store from "@/store";


const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.mount('#app');
