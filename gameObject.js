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
    console.log(cards);
    // const valid_cards = cards.filter(card => this.hands[userId].includes(card));
    // TODO: revert back to this filter after implementing a way to compare card objects to properly filter
    const valid_cards = cards;
    console.log('valid_cards', valid_cards);
    const new_hand = this.hands[userId].filter(
      card => !valid_cards.includes(card)
    );

    this.hands[userId] = new_hand;
    this.table[this.getChair(userId)].push(...valid_cards);
    return { table: this.table, hand: this.hands[userId], new_hand: new_hand };
  }
}
exports.GameObject = GameObject;
