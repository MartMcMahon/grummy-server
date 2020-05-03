const GameObject = require("../gameObject");

describe("gameObject", () => {
  let gameObject;

  beforeEach(() => {
    gameObject = new GameObject.GameObject();
    gameObject.startRound();
  });

  it("starts a new round", () => {
    expect(gameObject.deck.length).toBe(52);
  });

  it("can register players", () => {
    let chair = gameObject.registerPlayer(111);
    expect(chair).toBe(0);

    chair = gameObject.registerPlayer(222);
    expect(chair).toBe(1);

    chair = gameObject.registerPlayer(333);
    chair = gameObject.registerPlayer(111);
    expect(chair).toBe(0);

    chair = gameObject.registerPlayer(444);
    chair = gameObject.registerPlayer(555);
    expect(chair).toBe(-1);
  });

  it("can deal cards", () => {
    gameObject.registerPlayer(111);
    const hand = gameObject.deal(111);
    expect(hand.length).toBe(1);
  });

  describe("playing cards", () => {
    let state;
    it("doesn't play a card not in the hand", () => {
      gameObject.registerPlayer(111);
      let { table, hand } = gameObject.playCards(111, [
        { suit: 1, value: 1 },
        { suit: 69, value: 69 }
      ]);
      expect(table[0]).toEqual([]);
    });

    it("plays cards in the hand", () => {
      gameObject.registerPlayer(111);
      const small_run = [{suit:1, value: 2}, {suit: 1, value: 3}, {suit:1, value:4}];
      gameObject.hands[111] = [...small_run, {suit: 3, value: 10}];
      let {hand, table} = gameObject.playCards(111, [...small_run]);
      small_run.forEach(c => {
        expect(table[0]).toContain(c);
      });
      expect(hand).toContain({suit:3, value: 10});
      expect(hand.length).toEqual(1);
    });
  });
});
