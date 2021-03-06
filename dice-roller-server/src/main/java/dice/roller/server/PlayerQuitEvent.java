package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PlayerQuitEvent {

    public PlayerQuitEvent(String username, String color) {
        this.type = EventType.PLAYER_QUIT.name();
        this.data = new PlayerInfo(username, color);
    }

    private String type;

    private PlayerInfo data;

}
