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

  console.log(status);

  let db = admin.firestore();
  db.collection("games/")
    .doc(game_id)
    .update({ deck: JSON.stringify(deck) })
    .then(res => {
      console.log("updated the deck");
    });

  res.send({ card });
});

app.get("/game_status", async (req, res) => {
  const id = await admin
    .firestore()
    .collection("games")
    .get()
    .then(snapshot => {
      let docs = snapshot.docs;
      let id = docs[docs.length - 1].id;
      console.log(id);
      return id;
    });
  console.log(id);
  res.send({id});
});

app.get("/play_card", (req, res) => {
  const card = new Card(res.query.s, res.query.v);
  let db = admin.firestore();
  // db.collection("games/")
  //   .doc(game_id)
  // .set({
});

app.listen(port);
