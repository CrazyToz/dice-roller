import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from "vuex";
import {createRouter, createWebHashHistory} from "vue-router";
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

const store = createStore({
    state() {
        return {
            webSocketConnectionReady: false,
            playerInfo: null,
            webSocketConnection: null,
            myRolls: [],
            otherPlayersRolls: []
        }
    },
    mutations: {
        initPlayerInfo(state, playerInfo) {
            state.playerInfo = {
                username: playerInfo.username,
                color: playerInfo.color
            };
        },
        webSocketReady(state, webSocket) {
            if (process.env.VUE_APP_DEBUG) {
                console.log('WebSocket successfully initiated !');
            }
            state.webSocketConnection = webSocket;
            state.webSocketConnectionReady = true;
        },
        newRoll(state, dices) {
            if (Array.isArray(dices) && dices.length) {
                let rolls = dices.map(faces => {
                    return {
                        faces: faces,
                        value: Math.floor(Math.random() * faces) + 1
                    }
                });
                state.myRolls = state.myRolls.concat(rolls);
                if (state.webSocketConnectionReady) {
                    state.webSocketConnection.send(JSON.stringify({
                        type: 'NEW_ROLL',
                        data: {
                            playerInfo: state.playerInfo,
                            dices: rolls
                        }
                    }));
                    if (process.env.VUE_APP_DEBUG) {
                        console.log('New roll sent to other players !');
                    }
                }
            }
        },
        quit(state) {
            if (state.webSocketConnectionReady) {
                state.webSocketConnection.close();
                state.webSocketConnection = null;
                state.webSocketConnectionReady = false;
                state.playerInfo = null;
                state.myRolls = [];
                state.otherPlayersRolls = [];
            }
        },
        otherPlayerJoined(state, payload) {
            if (!state.otherPlayersRolls.find(player => player.username === payload.username && player.color === payload.color)) {
                if (process.env.VUE_APP_DEBUG) {
                    console.log(`New played ${payload.username}-${payload.color} has joined !`);
                }
                state.otherPlayersRolls.push({
                    username: payload.username,
                    color: payload.color,
                    rolls: []
                });
            }
        },
        otherPlayerRoll(state, payload) {
            const player = state.otherPlayersRolls.find(player => player.username === payload.username && player.color === payload.color);
            if (player) {
                player.rolls.push(payload.dices);
            } else {
                state.otherPlayersRolls.push({
                    username: payload.username,
                    color: payload.color,
                    rolls: payload.dices
                });
            }
        },
        otherPlayerQuit(state, payload) {
            state.otherPlayersRolls = state.otherPlayersRolls.filter(player => player.username !== payload.username && player.color !== payload.color);
        }
    },
    actions: {
        initWebSocketConnection({commit, state}, playerInfo) {
            if (!state.webSocketConnectionReady) {
                let webSocketConnection = new WebSocket(`${process.env.VUE_APP_WEBSOCKET_API_ENDPOINT}/lobby/${playerInfo.username}/${playerInfo.color}`);
                webSocketConnection.onopen = function () {
                    commit('webSocketReady', webSocketConnection);
                };
                webSocketConnection.onmessage = function (event) {
                    switch (event.data.type) {
                        case 'NEW_PLAYER':
                            commit('otherPlayerJoined', event.data.data);
                            break;
                        case 'NEW_ROLL':
                            commit('otherPlayerRoll', event.data.data);
                            break;
                        case 'PLAYER_QUIT':
                            commit('otherPlayerQuit', event.data.data);
                            break;
                    }
                }
            }
        }
    }
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
