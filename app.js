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
const cors = require("cors")
const app = express();

const session = {};

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
  session.deck = new deckMod.Deck();
  deck.shuffle();

  const game_id = Date.now().toString();

  let db = admin.firestore();
  db.collection("games/")
    .doc(game_id)
    .set({deck: JSON.stringify(deck)})
    .then(res => {
      console.log("new game", res);
    });

  // const c = deck.draw();
  // console.log(c.toString());
  res.send({game_id});

});

// app.get("/draw", (req,res) => {

// app.get("/draw", (req, res) =>
// cool. cool. cool.

app.listen(port);
