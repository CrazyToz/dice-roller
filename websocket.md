# Protocol

1. Server listen connections at */lobby/{username}/{color}* 
2. Clients are notified of each new user connection (see format bellow)
3. Clients are notified of each new roll 
4. Clients are notified of each user disconnection. Disconnection is different of a leave event, and could mean that a player refresh the page without leaving the app.
5. Clients are notified when a player explicitely leave the app (leave button).

# Notes

When a player refresh the browser or close the tab, other clients will not immediatly remove player history, but wait some time and mark the player as disconnected.

# Events format

## New player

```json
{
  "type": "new_player",
  "data": {
    "color": "orange",
    "username": "toz"
  }
}
```

## Dice roll

```json
{
  "type": "new_roll",
  "data": {
    "playerInfo": {
      "username": "toz",
      "color": "orange",
    },
    "dices": [
      {
        "faces": 6,
        "value": 4
      },
      {
        "faces": 6,
        "value": 2 
      }
    ]
  }
}
```

## Player disconnected

```json
{
  "type": "player_disconnected",
  "data": {
    "username": "toz",
    "color": "orange"
  }
}
```

## Player quit

```json
{
  "type": "player_quit",
  "data": {
    "username": "toz",
    "color": "orange"
  }
}
```

