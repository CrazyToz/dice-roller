import {createApp} from 'vue'
import App from './App.vue'
import {createStore} from "vuex";

const store = createStore({
    debug: process.env.DEBUG,
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
            if (debug) {
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
                state.myRolls.push(rolls);
                if (state.webSocketConnectionReady) {
                    state.webSocketConnection.send(JSON.stringify({
                        type: 'NEW_ROLL',
                        data: {
                            playerInfo: state.playerInfo,
                            dices: rolls
                        }
                    }))
                    if (debug) {
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
                if (debug) {
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
                let webSocketConnection = new WebSocket(`${process.env.WEBSOCKET_API_ENDPOINT}/lobby/${playerInfo.username}/${playerInfo.color}`)
                webSocketConnection.onopen = function (event) {
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

const app = createApp(App).mount('#app')

app.use(store);