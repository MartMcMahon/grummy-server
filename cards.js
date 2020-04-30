class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value + 1;
  }
}
exports.Card = Card;

exports.Deck = class Deck extends Array {
  constructor() {
    super();
    for (let s = 0; s < 4; s += 1) {
      for (let v = 0; v < 13; v += 1) {
        this.push(new Card(s, v));
      }
    }
  }

  shuffle() {
    let m = this.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this[m];
      this[m] = this[i];
      this[i] = t;
    }

    return this;
  }

  draw() {
    if (this.length > 0) {
      return this.shift();
    }
    // TODO: this return needs to be changed
    // once the logic for the server is in place
    return {
      toString: () => {
        console.log("the deck is empty");
      }
    };
  }

  toJson() {
  }
};
