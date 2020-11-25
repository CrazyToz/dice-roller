package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class PlayerQuitEvent {

    public PlayerQuitEvent(String type, String username) {
        this.type = type;
        this.data = new Data(username);
    }

    private String type;

    private Data data;

    static class Data {
        private String username;

        public Data(String username) {
            this.username = username;
        }
    }
}
