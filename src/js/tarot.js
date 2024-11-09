let max,
  cnt = 0;
let cardList = [];
let selected = [];
let type = "";

initialize();
makeCardFan();

function initialize() {
  const urlParams = new URL(location.href).searchParams;
  type = urlParams.get("type");

  switch (type) {
    case "fortune":
      max = 2;
      break;
    case "love":
      max = 6;
      break;
    case "money":
      max = 5;
      break;
    case "career":
      max = 7;
      break;
    case "ys":
      max = 1;
      break;

    default:
      location.href = "home.html";
      break;
  }

  if (max !== "") {
    document.getElementById("card-cnt").innerText = max;
  } else if (max === null || max === undefined || max === 0) {
    location.href = "home.html";
  }

  initCards();
}

function initCards() {
  const jsonData = JSON.parse(JSON.stringify(Cards));

  cardList = cardList.concat(jsonData.major);
  cardList = cardList.concat(jsonData.cup);
  cardList = cardList.concat(jsonData.pentacles);
  cardList = cardList.concat(jsonData.swords);
  cardList = cardList.concat(jsonData.wand);
}

function makeCardFan() {
  let text = "";

  for (let i = 0; i < cardList.length; i++) {
    text += `<div class="card" id="c${i}" onclick="addCardList()">
      <img src="../../cards/back.png" alt="" />
    </div>`;
  }

  document.getElementById("cards").innerHTML = text;
}

function addCardList() {
  if (cnt === max) {
    document.getElementById("send-btn").disabled = false;
    return;
  }

  num = Math.floor(Math.random() * 156);

  let upDown = num >= 78 ? "down" : "up";
  let tmp = cardList[upDown === "down" ? num - 78 : num];
  let obj = {
    id: cnt + 1 + "",
    name: tmp.name,
    "kor-name": tmp["kor-name"],
    upDown: upDown,
    read: false,
  };

  if (type === "ys") obj[type] = tmp.ys;
  else if (type == "fortune") obj[type] = tmp[upDown][type];
  else obj[type] = tmp[upDown][type][cnt + 1 + ""];

  selected.push(obj);
  cardList.splice(num, 1);
  makeCardFan();

  cnt++;

  document.getElementById("card-cnt").innerText = max - cnt;

  if (cnt === max) {
    document.getElementById("send-btn").disabled = false;
  }
}

function resetSelect() {
  document.getElementById("card-cnt").innerText = max;
  document.getElementById("send-btn").disabled = true;

  cnt = 0;
  selected = [];
  cardList = [];

  initCards();
  makeCardFan();
}

function sendResult() {
  const urlParams = new URL(location.href).searchParams;
  const type = urlParams.get("type");

  localStorage.setItem("tarot", JSON.stringify(selected));
  location.href = "result.html?type=" + type;
}
