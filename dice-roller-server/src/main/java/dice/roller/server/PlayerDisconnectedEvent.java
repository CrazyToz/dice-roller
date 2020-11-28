package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PlayerDisconnectedEvent {

    public PlayerDisconnectedEvent(String username, String color) {
        this.type = EventType.PLAYER_DISCONNECTED.name();
        this.data = new PlayerInfo(username, color);
    }

    private String type;

    private PlayerInfo data;

}
