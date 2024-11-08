const urlParams = new URL(location.href).searchParams;
const type = urlParams.get("type");
let lost = localStorage.getItem("tarot");

if (type === null || type === undefined || type === "")
  location.href = "home.html";

if (lost === null || lost === undefined) location.href = "home.html";

const tarot = JSON.parse(lost);

init();

function init() {
  makeCards();
  addCardFlipAnitaion();
}

function makeCards() {
  let text = `<div class="card-box ${type}">`;

  for (let i = 0; i < tarot.length; i++) {
    let category = tarot[i]["name"].split("-")[0];

    text += `
    <div class="card-container ${type}-${i}" onclick="makeScript()" >
      <div class="card-wrapper">
        <img id="${tarot[i]["name"]}" class="back-img card_face ${tarot[i]["upDown"]}-card" src="../../cards/${tarot[i]["name"]}.png" />
        <img class="front-img card_face" src="../../cards/back.png" />
        </div>
      </div>
    <span>${tarot[i]["kor-name"]}</span>
      `;
  }

  text += "</div>";
  document.getElementById("result-container").innerHTML = text;
}

function addCardFlipAnitaion() {
  let cards = document.querySelectorAll(".card-wrapper");

  cards.forEach((card, i) => {
    card.addEventListener("click", function () {
      let firstChild = card.firstElementChild;

      if (card.classList.contains("is-flipped"))
        card.addEventListener("click", showCardInfo(firstChild.id));
      card.classList.add("is-flipped");
      makeScript(i + 1, firstChild.id);
    });
  });
}

function getCardInfo(name) {
  return tarot.find(function (e, i) {
    if (e.name === name) return e;
  });
}

// cnt - 는 몇번째로 뽑은 카드인지
function makeScript(cnt, name) {
  // const fortuneList = ["오전의 운세 - ", "오후의 운세 - "];
  // const loveList = [];
  // const careerList = [];
  // const moneyList = [];

  if (cnt === undefined) return;

  let cardInfo = getCardInfo(name);

  console.log(cardInfo);

  if (cardInfo === null || cardInfo === undefined || cardInfo === "") {
    console.log("error");
    // location.href = "home.html";
  }

  // switch (type) {
  //   case "fortune":
  //     max = 2;
  //     break;
  //   case "love":
  //     max = 6;
  //     break;
  //   case "money":
  //     max = 5;
  //     break;
  //   case "career":
  //     max = 7;
  //     break;
  //   case "ys":
  //     max = 1;
  //     break;

  //   default:
  //     location.href = "home.html";
  //     break;
  // }
}

function showCardInfo(name) {}
