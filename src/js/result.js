const urlParams = new URL(location.href).searchParams;
const type = urlParams.get("type");
let lost = localStorage.getItem("tarot");

if (type === null || type === undefined || type === "")
  location.href = "home.html";

if (lost === null || lost === undefined) location.href = "home.html";

const tarot = JSON.parse(lost);

init();

function init() {
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
}

function makeCards(content) {
  let text = `<div class="card-wrapper ${type}">`;

  for (let i = 0; i < tarot.length; i++) {
    text += `<div class="card ${type}-card" onclick="${content}">${tarot[i]["kor-name"]}</div>`;
  }

  text += "</div>";

  document.getElementById("result-container").innerHTML = text;
}

// function makefortuneAndYsSheet() {}
// function makeLoveSheet() {}
// function makeMoneySheet() {}
// function makeCareerSheet() {}
