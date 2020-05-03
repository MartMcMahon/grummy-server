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
    gameId = gameObject.id;
  }
  res.send({ id: gameId });
  return gameId;
});

app.get("/play_card", (req, res) => {
  const card = { suit: req.query.s, value: req.query.v };
  const table = gameObject.playCard(req.query.userId, card);
  res.send({ table });
});

app.get("/get_hand", (req, res) => {
  res.send(gameObject.hands[req.query.userId]);
});

app.put("/register_player", (req, res) => {
  let userId = req.query.userId;
  let response;
  switch (gameObject.registerPlayer(userId)) {
    case "taken":
      response ={ statusCode: 409, reason: "username taken" };
      break;
    case "full":
      response ={ statusCode: 409, reason: "game is full" };
      break;
    default:
      response ={ statusCode: 200 };
  }
  res.send(response);
});

app.listen(port);
