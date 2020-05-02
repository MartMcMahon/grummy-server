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

const deckMod = require("./cards");
const GameObject = require("./gameObject");
let gameObject = null;

let deck;

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
  if (gameObject) {
    res.send({ id: gameObject.id });
    return gameObject.id;
  } else {
    gameObject = new GameObject.GameObject();
    res.send({ id: 69 });
    return 69;
  }
});

app.get("/play_card", (req, res) => {
  const card = { suit: req.query.s, value: req.query.v };
  const table = gameObject.playCard(req.query.userId, card);
  res.send({ table });
});

app.get("/get_hand", (req, res) => {
  res.send(gameObject.hands[req.query.userId]);
});

app.get("/register_player", (req, res) => {
  let userId = req.query.userId;
  gameObject.registerPlayer(userId);
  res.send({ statusCode: 200 });
});

app.listen(port);
