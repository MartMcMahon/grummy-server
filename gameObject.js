let admin = require("firebase-admin");
class GameObject {
  constructor() {
    this.id = 10;
    this.players = ["", "", "", ""];
    this.hands = {};
  }

  // returns the index when a seat is found
  // returns the string "full" if the table is full
  registerPlayer(userId) {
    for (let i; i < 4; i++) {
      if (!this.players[i]) {
        this.players[i] = userId;
        return i;
      }
    }

    this.hands[userId] = [];
    return "full";
  }




}
exports.GameObject = GameObject;
