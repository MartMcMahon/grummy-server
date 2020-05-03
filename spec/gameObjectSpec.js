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
    console.log(hand);
    expect(hand.length).toBe(1);
  });

  it("can play a card", () =>{
    gameObject.registerPlayer(111);
    gameObject.registerPlayer(222);
    let table = gameObject.playCard(111, {suit:1,value:1});
    table = gameObject.playCard(222, {suit:2,value:2});
    expect(table[0]).toContain({suit: 1,value: 1});
    expect(table[1]).toContain({suit: 2,value: 2});
    });

});
