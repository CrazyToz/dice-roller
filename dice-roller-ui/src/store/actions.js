export const actions = {
    refreshStore({dispatch, state}) {
        let backedStoreAsString = sessionStorage.getItem('store');
        if (backedStoreAsString) {
            let backedStore = JSON.parse(backedStoreAsString);
            Object.assign(state, backedStore);
            if (state.webSocketConnectionReady) {
                dispatch('initWebSocketConnection', state.playerInfo);
            }
        }
    },
    initWebSocketConnection({commit}, playerInfo) {
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
                case 'PLAYER_DISCONNECTED':
                    commit('otherPlayerDisconnected', payload.data);
                    break;
                case 'PLAYER_QUIT':
                    commit('otherPlayerQuit', payload.data);
                    break;
            }
        }
    }
}