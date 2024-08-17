class Poker {
  value;
  suit;
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}

const button = document.getElementById("button");

const title = document.getElementsByClassName("title")[0];
const end = document.getElementsByClassName("end")[0];

let isPlayer1=true
let stop=false

button.addEventListener("click", () => {
  isPlayer1?play(1):play(2)
});

let pokerStack = [];
//生成一副牌
for (let i = 1; i < 14; i++) {
  let poker1 = new Poker(`${i}`, "♣");
  let poker2 = new Poker(`${i}`, "♠");
  let poker3 = new Poker(`${i}`, "♥");
  let poker4 = new Poker(`${i}`, "♦");
  pokerStack.push(poker1, poker2, poker3, poker4);
}

pokerStack = pokerStack.map((item) => {
  if (item.value == "1") {
    item.value = "A";
  } else if (item.value == "13") {
    item.value = "K";
  } else if (item.value == "12") {
    item.value = "Q";
  } else if (item.value == "11") {
    item.value = "J";
  }
  return item;
});

pokerStack.push(new Poker("JOKER", "x"), new Poker("JOKER", "d"));

//洗牌
pokerStack.sort(() => Math.random() - 0.5);

let player1 = [...pokerStack].splice(0, 27);
let player2 = [...pokerStack].splice(27, 54);

let playingStack = [];

const data = {
  p1: player1,
  p2: player2,
  s: playingStack,
};

init();
