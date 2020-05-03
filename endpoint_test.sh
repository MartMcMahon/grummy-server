GAME_ID=$(curl -X GET -v http://localhost:6969/game_status | jq ".id")
echo "$GAME_ID"
curl -v -X PUT http://localhost:6969/register_player?userId=bitch
# this should get username taken
curl -v -X PUT http://localhost:6969/register_player?userId=bitch
curl -v -X PUT http://localhost:6969/register_player?userId=bitch2
curl -v -X PUT http://localhost:6969/register_player?userId=bitch3
curl -v -X PUT http://localhost:6969/register_player?userId=bitch4
# this should get that the game is full
curl -v -X PUT http://localhost:6969/register_player?userId=bitch5
