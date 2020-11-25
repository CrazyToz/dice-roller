# Protocol

1. Server listen connections at */lobby/{username}/{color}* 
2. Clients are notified of each new user connection (see format bellow)
3. Clients are notified of each new roll 
4. Clients are notified of each user disconnection

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

## Player quit

```json
{
  "type": "player_quit",
  "data": {
    "username": "toz"
  }
}
```

