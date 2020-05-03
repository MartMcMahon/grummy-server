const deckMod = require("./cards");

class GameObject {
  constructor() {
    this.id = Date.now().toString();
    this.deck = [];
    this.hands = {};
    this.players = ["", "", "", ""];
    this.rounds = 0;
    this.score = [0, 0, 0, 0];
    this.table = [[], [], [], []];
  }

  startRound() {
    this.rounds += 1;
    this.deck = new deckMod.Deck();
    this.deck.shuffle();
    this.table = [[], [], [], []];
    this.players.forEach((id, i) => {
      this.hands[id] = [];
    });
  }

  // checks for presence of username in the game
  // returns the index when a seat is found
  // returns the string "full" if the table is full
  registerPlayer(userId) {
    if (this.players.indexOf(userId) > -1) {
      return "taken";
    } else if (this.players.indexOf('') == -1) {
      return "full";
    } else {
      let userSet;
      this.players.forEach((player, i) => {
        if (!this.players[i] && !userSet) {
          this.players[i] = userId;
          userSet = true;
          return i;
        }
      });
    }
  }

  deal(userId, n = 1) {
    for (let i = n; i--; ) {
      const card = this.deck.draw();
      this.hands[userId].push(card);
    }
    return this.hands[userId];
  }

  getChair(userId) {
    return this.players.indexOf(userId);
  }

  playCard(userId, card) {
    const chair = getChair(userId);
    table[chair].push(card);
    return this.table;
  }
}
exports.GameObject = GameObject;
