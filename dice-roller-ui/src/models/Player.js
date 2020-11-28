export class Player {

    /**
     * @param username
     * @param color
     * @param rolls array of array of rolls, see models/Roll
     */
    constructor(username, color, rolls) {
        this.username = username;
        this.color = color;
        this.connected = true;
        this.rolls = rolls;
    }

    set connected(value) {
        this.connected = value;
    }

}