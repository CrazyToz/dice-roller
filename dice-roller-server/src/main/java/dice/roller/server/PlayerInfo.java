package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
class PlayerInfo {
    private String username;
    private String color;

    public PlayerInfo(String username, String color) {
        this.username = username;
        this.color = color;
    }
}
