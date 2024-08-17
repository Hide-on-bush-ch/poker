const container = document.getElementById("container");

function createDiv(className) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

function createH1(className) {
  const h1 = document.createElement("H1");
  h1.className = className;
  return h1;
}

function createSpan(className) {
  const span = document.createElement("span");
  span.className = className;
  return span;
}

function renderPoker(poker) {
  const pokerBox = createDiv("pokerBox");
  const pokerSuit = createDiv("pokerSuit");
  const pokerValue1 = createDiv("pokerValue pokerValue1");
  const pokerValue2 = createDiv("pokerValue pokerValue2");
  const text1 = createSpan("text");
  const text2 = createSpan("text");

  if (poker.value === "JOKER") {
    pokerBox.style.color = poker.suit === "x" ? "black" : "red";
    text1.innerText = text2.innerText = pokerSuit.innerText = poker.value;
    pokerSuit.className = "joker";
    text1.className = "text-joker";
    text2.className = "text-joker";
    pokerValue1.appendChild(text1);
    pokerValue2.appendChild(text2);
    pokerBox.appendChild(pokerValue1);
    pokerBox.appendChild(pokerValue2);
    pokerBox.appendChild(pokerSuit);
    return pokerBox;
  } else {
    pokerBox.style.color =
      poker.suit === "♦" || poker.suit === "♥" ? "red" : "black";
  }

  const suit1 = createSpan("suit");
  const suit2 = createSpan("suit");
  const suit3 = createSpan("suit-center");

  text1.innerText = poker.value;
  text2.innerText = poker.value;

  suit1.innerText = poker.suit;
  suit2.innerText = poker.suit;
  suit3.innerText = poker.suit;

  pokerSuit.appendChild(suit3);
  pokerValue1.appendChild(text1);
  pokerValue1.appendChild(suit1);
  pokerValue2.appendChild(text2);
  pokerValue2.appendChild(suit2);
  pokerBox.appendChild(pokerSuit);
  pokerBox.appendChild(pokerValue1);
  pokerBox.appendChild(pokerValue2);
  return pokerBox;
}

function renderPokers(pokerList, type) {
  const box = type === "stack" ? createDiv("stack") : createDiv("box");
  const h1 = createH1("h1");
  h1.innerText = type;
  box.appendChild(h1);
  for (let i = 0; i < pokerList.length; i++) {
    const poker = renderPoker(pokerList[i]);
    box.appendChild(poker);
  }
  return box;
}

function init() {
  const play1 = renderPokers(data["p1"], "player1");
  const stack = renderPokers(data["s"], "playingStack");
  const play2 = renderPokers(data["p2"], "player2");
  const main = createDiv("main");
  main.appendChild(play1);
  main.appendChild(stack);
  main.appendChild(play2);
  container.appendChild(main);
}

function play(num) {
  const res = data[`p${num}`].shift();
  data["s"].push(res);

  //若最后一张牌为大小王，清空playingStack，将所有牌置入最后一张牌的打出者的牌堆底
  if (data["s"].at(-1)?.value === "JOKER" && data["s"].length > 1) {
    data[`p${num}`].push(...data["s"]);
    data["s"] = [];
    isPlayer1 = !isPlayer1;
  }

  //将最后一张牌和与最后一张牌匹配的牌及它们中间所有的牌置入最后一张牌的打出者的牌堆底
  const newArr = data["s"].map((item) => item.value);
  newArr.pop();
  const index = newArr.indexOf(data["s"].at(-1)?.value);
  if (index !== -1) {
    const res = data["s"].splice(index, data["s"].length - index);
    data[`p${num}`].push(...res);
    isPlayer1 = !isPlayer1;
  }

  //先结算，再判断手牌数量
  if (data["p1"].length === 0 || data["p2"].length === 0) {
    stop = true;
    title.innerText = "game over! player" + (isPlayer1 ? 2 : 1) + "win!";
    end.style.display = "block";
  }

  const length = container.children.length;
  for (let i = 2; i < length; i++) {
    container.children[2].remove();
  }

  isPlayer1 = !isPlayer1;
  init();
}
