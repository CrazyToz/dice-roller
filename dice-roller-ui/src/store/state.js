export const state = () => {
    return {
        webSocketConnectionReady: false,
        playerInfo: null,
        webSocketConnection: null,
        lastRoll: null,
        myRolls: [],
        otherPlayersRolls: []
    }
}