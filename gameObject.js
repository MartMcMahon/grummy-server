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

    // this.clock = setInterval(() => {
    //   console.log({
    //     deck: this.deck,
    //     players: this.players,
    //     table: this.table,
    //     hands: this.hands
    //   });
    // }, 1000);
  }

  startRound() {
    this.rounds += 1;
    this.deck = new deckMod.Deck();
    this.deck.shuffle();
    this.table = [[], [], [], []];
    this.hands = {};
  }

  // checks for presence of username in the game
  // returns the index when a seat is found
  // returns the -1 if the table is full
  registerPlayer(userId) {
    let chair = this.players.indexOf(userId);
    if (chair + 1) {
      return chair;
    }
    for (let i = 0; i < 4; i++) {
      if (!this.players[i]) {
        this.players[i] = userId;
        this.hands[userId] = [];
        chair = i;
        break;
      }
    }
    return chair;
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

  playCards(userId, cards) {
    this.table[this.getChair(userId)].push(
      ...cards.map(i => this.hands[userId][i])
    );
    cards.forEach((i, j) => {
      this.hands[userId].splice(i - j, 1);
    });
  }
}
exports.GameObject = GameObject;
