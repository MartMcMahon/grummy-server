const hostname = "127.0.0.1";
const port = 6969;

let admin = require("firebase-admin");
let serviceAccount = require("./grummy-4db97-firebase-adminsdk-pfho9-60fcb53f5e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://grummy-4db97.firebaseio.com"
});

const deckMod = require("./cards");

const express = require("express");
const cors = require("cors");
const app = express();

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

app.get("/new", (req, res) => {

  deck = new deckMod.Deck();
  deck.shuffle();

  const game_id = Date.now().toString();

  let db = admin.firestore();
  db.collection("games/")
    .doc(game_id)
    .set({ deck: JSON.stringify(deck) })
    .then(res => {
      console.log("new game", res);
    });

  res.send({ game_id, deck });
});

app.get("/draw", (req, res) => {
  const userId = req.query.userId;
  const card = deck.draw();
  console.log("user " + userId + " drew " + card.toString());

  gameObject.hands[userId].push(card);
  res.send({ card });
});

const game_status = () => {
  console.log('running game_status');
  if (gameObject) {
    return gameObject.id;
  } else {
    gameObject = new GameObject.GameObject();
    return 69;
  }
};

app.get("/game_status", (req, res) => {
  const id = game_status();
  console.log(id);
  res.send({id});
});

// app.get("/get_hand", (req, res) => {



app.get("/play_card", (req, res) => {
  const card = new Card(res.query.s, res.query.v);
  let db = admin.firestore();
  // db.collection("games/")
  //   .doc(game_id)
  // .set({
});

app.get("/get_hand", (req, res) => {
  res.send(gameObject.hands[req.query.userId]);
});

app.get("/register_player", (req, res) => {
  let userId = req.query.userId;
  gameObject.registerPlayer(userId);
  res.send({statusCode: 200});
});


app.listen(port);
