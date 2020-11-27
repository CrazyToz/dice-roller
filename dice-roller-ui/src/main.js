import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from "vue-router";
import {store} from './store/index';
import Lobby from "./components/Lobby";
import Dashboard from "./components/Dashboard";

const routes = [
    {path: '/', component: Lobby},
    {path: '/dashboard', component: Dashboard}
];

const router = createRouter({
   history: createWebHashHistory(),
   routes: routes
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
