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

  it("can register a player", () => {
    const chair = gameObject.registerPlayer(111);
    expect(chair).toBe(0);
  });

  // it("can deal cards", () => {
  //   gameObject.registerPlayer(111);
  //   const hand = gameObject.deal(111);
  //   console.log(hand);
  //   expect(hand.hand.length).toBe(1);
  // });


});
