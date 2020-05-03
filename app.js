const hostname = "127.0.0.1";
const port = 6969;

let admin = require("firebase-admin");
let serviceAccount = require("./grummy-4db97-firebase-adminsdk-pfho9-60fcb53f5e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://grummy-4db97.firebaseio.com"
});

const express = require("express");
const cors = require("cors");
const app = express();

const { Card } = require("./cards");
const GameObject = require("./gameObject");
let gameObject = null;

app.use(cors());
app.get("/", (req, res) => {
  let db = admin.database();
  let ref = db.ref("games/");

  let val;
  // Attach an asynchronous callback to read the data at our posts reference
  ref.on(
    "value",
    function(snapshot) {
      val = snapshot.val();
      console.log(snapshot.val());
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
  res.send(val);
});

app.get("/draw", (req, res) => {
  const userId = req.query.userId;
  const hand = gameObject.deal(userId);
  res.send({ hand });
});

app.get("/game_status", (req, res) => {
  let gameId;
  if (gameObject) {
    gameId = gameObject.id;
  } else {
    gameObject = new GameObject.GameObject();
    gameObject.startRound();
    gameId = gameObject.id;
  }
  res.send({ id: gameId });
  return gameId;
});

app.put("/play_cards", (req, res) => {
  console.log(req.query);
  console.log(req.query.cards);
  console.log(JSON.parse(req.query.cards));
  const userId = req.query.userId;
  const cards = JSON.parse(req.query.cards).map(
    base_card => new Card(base_card)
  );
  const new_state = gameObject.playCards(userId, cards);
  res.send(new_state);
});

app.get("/get_hand", (req, res) => {
  res.send(gameObject.hands[req.query.userId]);
});

app.put("/register_player", (req, res) => {
  let userId = req.query.userId;
  let response;
  switch (gameObject.registerPlayer(userId)) {
    case "taken":
      res.statusCode = 409;
      response = "username taken";
      break;
    case "full":
      res.statusCode = 409;
      response = "game is full";
      break;
    default:
      res.statusCode = 200;
      response = "registered";
  }
  res.send(response);
});

app.get("/table", (req, res) => {
  res.send(this.table);
});

app.listen(port);
