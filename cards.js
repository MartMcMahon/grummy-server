const SUITS = {
  0: "Clubs",
  1: "Spades",
  2: "Hearts",
  3: "Diamonds"
};
const highvals = { 11: "Jack", 12: "Queen", 13: "King", 1: "Ace" };

class Card {

  constructor(suit, value) {
    this.suit = suit;
    this.value = value + 1;
  }

  toString() {
    let val = this.value;
    if (this.value > 10 || this.value === 1) {
      val = highvals[this.value];
    }
    return `the ${val} of ${SUITS[this.suit]}`;
  }
}
exports.Card = Card;

exports.Deck = class Deck extends Array {
  constructor() {
    console.log("new deck");
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
    return {
      toString: () => {
        console.log("the deck is empty");
      }
    };
  }

  toJson() {
  }
};
