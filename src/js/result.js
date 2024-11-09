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
  if (cnt === undefined) return;

  let cardInfo = getCardInfo(name);

  if (cardInfo === null || cardInfo === undefined || cardInfo === "") {
    location.href = "home.html";
  }

  if (cardInfo["read"] === true) return;

  const fortuneList = ["오전의 운세", "오후의 운세"];
  const loveList = [
    "상대방의 외모",
    "마주쳤을 때 내 반응",
    "상대방의 성격",
    "지금 만나지 못하는 이유",
    "조언점",
    "만나게 되는 상황",
  ];
  const careerList = [
    "자신의 진정한 진로 적성",
    "진로 개발을 위해 해야하는 것",
    "진로 관련 예상되는 어려움",
    "현재 상태의 직업 수준이나 근무 성과",
    "현재 상태를 개선 할 수 있는 방법",
    "현재 상태에 영향을 미치고 있는 과거 원인",
    "이후 기대할 수 있는 결과",
  ];
  const moneyList = [
    "현재 금전적 상황 또는 돈에 얽힌 인간관계",
    "돈에 대한 시각이나 태도",
    "과거의 금전상태, 돈과 관련해서 과거의 인물이 주는 영향, 또한 어떻게 해서 돈에 대한 지금의 생각을 가지게 되었는지",
    "돈과 어떤 정신적 관계, 금전적인 일과 관련해서 질문자가 배워야할 점",
    "현재의 금전환경을 벗어나기 위해서 취해야할 행동",
  ];
  let scriptList = null;

  switch (type) {
    case "fortune":
      scriptList = fortuneList;
      break;
    case "love":
      scriptList = loveList;
      break;
    case "money":
      scriptList = moneyList;
      break;
    case "career":
      scriptList = careerList;
      break;
    case "ys":
      scriptList = ["Yes Or No"];
      break;

    default:
      location.href = "home.html";
      break;
  }

  let id = cardInfo["id"];

  let interpretationBox = "";
  interpretationBox += "<div class='script-box'>";
  interpretationBox += `  <div class="sub-title">${scriptList[+id - 1]}`;
  interpretationBox += ` <span class='card-name'>카드 - ${cardInfo["kor-name"]}</span>`;
  interpretationBox += "</div><hr />";
  interpretationBox += `  <div class="content">${cardInfo[type]}</div>`;
  interpretationBox += "</div>";

  document.getElementsByClassName("interpretation-box")[0].innerHTML +=
    interpretationBox;

  tarot[+id - 1]["read"] = true;
}

// function showCardInfo(name) {}
