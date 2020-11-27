export const actions = {
    initWebSocketConnection({commit, state}, playerInfo) {
        if (!state.webSocketConnectionReady) {
            let webSocketConnection = new WebSocket(`${process.env.VUE_APP_WEBSOCKET_API_ENDPOINT}/lobby/${playerInfo.username}/${playerInfo.color}`);
            webSocketConnection.onopen = function () {
                commit('webSocketReady', webSocketConnection);
            };
            webSocketConnection.onmessage = function (event) {
                let payload = JSON.parse(event.data);
                switch (payload.type) {
                    case 'NEW_PLAYER':
                        commit('otherPlayerJoined', payload.data);
                        break;
                    case 'NEW_ROLL':
                        commit('otherPlayerRoll', payload.data);
                        break;
                    case 'PLAYER_QUIT':
                        commit('otherPlayerQuit', payload.data);
                        break;
                }
            }
        }
    }
}