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

store.subscribe(((mutation, state) => {
    let backedStore = {
        webSocketConnectionReady: state.webSocketConnectionReady,
        playerInfo: state.playerInfo,
        myRolls: state.myRolls,
        otherPlayersRolls: state.otherPlayersRolls
    };
    sessionStorage.setItem('store', JSON.stringify(backedStore));
}));

store.dispatch('refreshStore');

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
