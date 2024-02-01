let BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// let image = document.querySelector("img");

const dropdownOpt = document.querySelectorAll(".opt select");

let from = document.querySelector("#from");
let to = document.querySelector("#to");

let inpBox = document.querySelector("input");
let msg = document.querySelector("#message");

let btn = document.querySelector("button");
let msgValue = document.querySelector(".hide");

//Access the countrylists:

for (let option of dropdownOpt) {
  for (let countryCode in countryList) {
    // console.log(countryCode, countryList[countryCode]);
    let newOpt = document.createElement("option");
    newOpt.innerText = countryCode;
    newOpt.value = countryCode;
    option.append(newOpt);
  }

  option.addEventListener("change", (e) => {
    changeFlag(e.target);
  });
}

const changeFlag = (e) => {
  let currencyCode = e.value;
  console.log(currencyCode);
  let countCode = countryList[currencyCode];
  console.log(countCode);
  let newSrc = `https://flagsapi.com/${countCode}/shiny/64.png`;
  let image = e.parentElement.querySelector("img");
  image.src = newSrc;
};

const inputData = () => {
  if (inpBox.value === "" || inpBox.value < 1) {
    alert("Please enter valid amount...");
  } else {
    console.log(inpBox.value);
    msgValue.style.display = "block";
  }
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  inputData();
  let fromCurr = from.value.toLowerCase();
  let toCurr = to.value.toLowerCase();
  const URL = `${BASE_URL}/${fromCurr}/${toCurr}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let toRate = await data[toCurr];
  let convertedCurr = toRate * inpBox.value;
  console.log(data);
  console.log(convertedCurr);

  msg.innerText = "Fetching Data.....";

  setTimeout(() => {
    msg.innerText = `${
      inpBox.value
    } ${fromCurr.toUpperCase()} = ${convertedCurr} ${toCurr.toUpperCase()}`;
  }, 2000);

  console.log(fromCurr, toCurr);
});
