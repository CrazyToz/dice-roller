package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class NewPlayerEvent {

    public NewPlayerEvent(String type, String username, String color) {
        this.type = type;
        this.data = new Data(username, color);
    }

    private String type;

    private Data data;

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    static class Data {
        private String username;
        private String color;

        public Data(String username, String color) {
            this.username = username;
            this.color = color;
        }
    }

}
