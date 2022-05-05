import { createApp } from 'vue'
import App from './App.vue'
import moment from "moment";
window.$ = window.jQuery = require("jquery");
window.moment = moment;
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
