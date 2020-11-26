package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PlayerQuitEvent {

    public PlayerQuitEvent(String type, String username, String color) {
        this.type = type;
        this.data = new PlayerInfo(username, color);
    }

    private String type;

    private PlayerInfo data;

}
