//  ----- LOGIC FUNCTIONS -----

const convertLettersToNumbers = function (array) {
  return array.map((num) => {
    if (num == "A") {
      return (num = 10);
    } else if (num == "B") {
      return (num = 11);
    } else if (num == "C") {
      return (num = 12);
    } else if (num == "D") {
      return (num = 13);
    } else if (num == "E") {
      return (num = 14);
    } else if (num == "F") {
      return (num = 15);
    } else {
      return Number(num);
    }
  });
};

const convertNumbersToLetters = function (array) {
  return array.map((num) => {
    if (num == 10) {
      return (num = "A");
    } else if (num == 11) {
      return (num = "B");
    } else if (num == 12) {
      return (num = "C");
    } else if (num == 13) {
      return (num = "D");
    } else if (num == 14) {
      return (num = "E");
    } else if (num == 15) {
      return (num = "F");
    } else {
      return String(num);
    }
  });
};

const convertToDecimal = function (number, base) {
  // Split number into individual digits and convert letters to decimal numbers
  let numberAsArray = convertLettersToNumbers(number.split("").reverse());

  let decimal = 0;

  numberAsArray.forEach((num, index) => {
    decimal += num * Math.pow(base, index);
  });
  return decimal;
};

const convertFromDecimal = function (number, base) {
  const convertedNumber = [];
  while (number >= base) {
    convertedNumber.push(number % base);
    number = Math.floor(number / base);
  }
  convertedNumber.push(number);

  // Convert to letters and return
  return convertNumbersToLetters(convertedNumber).reverse().join("");
};

const displayAnswer = function (answerValue) {
  const answer = document.querySelector(".form__answer");
  answer.textContent = answerValue;
};

// ----- EVENT LISTENERS -----

const submitButton = document.querySelector(".form__submit");

submitButton.addEventListener("click", () => {
  const numberToConvert = document.getElementById("number-to-convert").value;
  const currentBase = document.getElementById("current_base").value;
  const convertBase = document.getElementById("converted_base").value;

  const decimal = convertToDecimal(numberToConvert, currentBase);
  const convertedValue = convertFromDecimal(decimal, convertBase);

  displayAnswer(convertedValue);
});
