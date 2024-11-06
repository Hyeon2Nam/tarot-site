let max,
  cnt = 0;
let cardList = [];
let selected = [];

initialize();
makeCardFan();

function initialize() {
  const urlParams = new URL(location.href).searchParams;
  const type = urlParams.get("type");

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
      break;
  }

  if (max !== "") {
    document.getElementById("card-cnt").innerText = max;
  } else if (max === null || max === undefined || max === "") {
    location.href = "home.html";
  }

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
    text += `<div class="card" id="c${i}" onclick="addCardList(${i})">
      <img src="../../cards/back.png" alt="" />
    </div>`;
  }

  document.getElementById("cards").innerHTML = text;
}

function addCardList(num) {
  selected.push(cardList[+num]);
  cardList.splice(+num, 1);
  makeCardFan();

  cnt++;
  if (cnt === max) {
    console.log(selected);
  }
}
