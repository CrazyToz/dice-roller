package dice.roller.server;

import io.micronaut.websocket.WebSocketBroadcaster;
import io.micronaut.websocket.WebSocketSession;
import io.micronaut.websocket.annotation.OnClose;
import io.micronaut.websocket.annotation.OnMessage;
import io.micronaut.websocket.annotation.OnOpen;
import io.micronaut.websocket.annotation.ServerWebSocket;

import java.util.function.Predicate;

@ServerWebSocket("/lobby/{username}/{color}")
public class DiceRollerWebSocket {

    private WebSocketBroadcaster webSocketBroadcaster;

    public DiceRollerWebSocket(WebSocketBroadcaster webSocketBroadcaster) {
        this.webSocketBroadcaster = webSocketBroadcaster;
    }

    @OnOpen
    public void onOpen(String username, String color, WebSocketSession session) {
        webSocketBroadcaster.broadcastSync(new NewPlayerEvent(username, color), isNotTheSameSession(session));
    }

    private Predicate<WebSocketSession> isNotTheSameSession(WebSocketSession session) {
        return otherSession -> otherSession != session;
    }

    @OnMessage
    public void onMessage(NewRollEvent event, WebSocketSession session) {
        webSocketBroadcaster.broadcastSync(event, isNotTheSameSession(session));
    }

    @OnClose
    public void onClose(String username, String color) {
        webSocketBroadcaster.broadcastSync(new PlayerDisconnectedEvent(username, color));
    }

}
