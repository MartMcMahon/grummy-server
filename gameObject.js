const deckMod = require("./cards");

class GameObject {
  constructor() {
    this.id = 10;
    // this.id = Date.now().toString();
    this.deck = [];
    this.hands = {};
    this.players = ["", "", "", ""];
    this.rounds = 0;
    this.score = [0,0,0,0];
    this.table = [[], [], [], []];
  }

  startRound() {
    rounds += 1
    this.deck = new deckMod.Deck();
    deck.shuffle();
    this.table = [[], [], [], []];
    this.players.forEach((id, i) => {
      this.hands[id] = [];
    });
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

  deal(userId, n=1) {
    for (let i=n;i--;) {
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
