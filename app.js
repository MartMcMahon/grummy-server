const express = require("express");
const app = express();

const hostname = "127.0.0.1";
const port = 6969;

let admin = require("firebase-admin");
let serviceAccount = require("./grummy-4db97-firebase-adminsdk-pfho9-60fcb53f5e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://grummy-4db97.firebaseio.com"
});

const deckMod = require("./cards");

app.get("/", (req, res) => {
  // Get a database reference to our posts
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
  console.log("new game");
  const deck = new deckMod.Deck();
  deck.shuffle();
  const c = deck.draw();
  console.log(c.toString());
  res.send(c.toString());
});

app.get("/deploy", (req, res) => {
  console.log("deploy");
  const g = spawn("git", ["status"]);
  res.send(200);
});

// app.get("/draw", (req, res) =>

app.listen(port);
