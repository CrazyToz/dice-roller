import {Player} from "../models/Player";

let playerExists = (payload) => {
    return player => player.username === payload.username && player.color === payload.color;
}

export const mutations = {
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
            state.lastRoll = rolls;
            state.myRolls.push(rolls);
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
        if (!state.otherPlayersRolls.find(playerExists(payload))) {
            if (process.env.VUE_APP_DEBUG) {
                console.log(`New player ${payload.username}-${payload.color} has joined !`);
            }
            state.otherPlayersRolls.push(new Player(payload.username, payload.color, []));
        }
    },
    otherPlayerRoll(state, payload) {
        if (process.env.VUE_APP_DEBUG) {
            console.log('New roll received by another player !', payload);
        }
        const player = state.otherPlayersRolls.find(player => player.username === payload.playerInfo.username && player.color === payload.playerInfo.color);
        if (player) {
            player.connected = true;
            player.rolls.push(payload.dices);
        } else {
            let rolls = [];
            rolls.push(payload.dices);
            state.otherPlayersRolls.push(new Player(payload.playerInfo.username, payload.playerInfo.color, rolls));
        }
    },
    otherPlayerQuit(state, payload) {
        state.otherPlayersRolls = state.otherPlayersRolls.filter(player => player.username !== payload.username && player.color !== payload.color);
    },
    otherPlayerDisconnected(state, payload) {
        if (process.env.VUE_APP_DEBUG) {
            console.log(`Played ${payload.username}-${payload.color} has disconnected !`);
        }
        const player = state.otherPlayersRolls.find(playerExists(payload));
        if (player) {
            player.connected = false;
        }
    }
};