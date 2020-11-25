package dice.roller.server;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class NewRollEvent {

    private String type;

    private Data data;

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    static class Data {

        private List<Dice> dices;

        @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
        static class Dice {
            private String faces;
            private String value;
        }

    }
}
