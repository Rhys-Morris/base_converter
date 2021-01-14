// ----- GLOBAL VARIABLES ------

// prettier-ignore
const validityArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
const answer = document.querySelector(".form__answer");

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
  answer.textContent = answerValue;
};

// Return boolean
const checkValidity = function (checkArray, validArray) {
  let valid = true;
  checkArray.forEach((value) => {
    if (!validArray.includes(value.toLowerCase())) {
      valid = false;
    }
  });
  return valid;
};

const errorSyntax = function () {
  answer.style.color = "red";
  answer.style["font-size"] = "1.5rem";
  setTimeout(() => {
    answer.textContent = "";
    answer.style.color = "black";
    answer.style["font-size"] = "2rem";
  }, 5000);
};

const handleInvalid = function () {
  answer.textContent =
    "Invalid number to convert, does not match current base!";
  errorSyntax();
};

const handleInvalidBase = function () {
  answer.textContent = "Invalid base provided!";
  errorSyntax();
};

const handleNoInput = function () {
  answer.textContent = "All fields must be completed!";
  errorSyntax();
};

// ----- EVENT LISTENERS -----

const submitButton = document.querySelector(".form__submit");

submitButton.addEventListener("click", () => {
  const numberToConvert = document.getElementById("number-to-convert").value;
  const currentBase = document.getElementById("current_base").value;
  const convertBase = document.getElementById("converted_base").value;

  // Check not empty
  if (!numberToConvert || !currentBase || !convertBase) {
    handleNoInput();
    return;
  }

  // Check validity of base entry
  if (currentBase < 2 || currentBase > 16) {
    handleInvalidBase();
    return;
  }

  if (convertBase < 2 || convertBase > 16) {
    handleInvalidBase();
    return;
  }

  //   Check validity of number entered
  const validValues = validityArray.slice(0, currentBase);
  if (!checkValidity(numberToConvert.split(""), validValues)) {
    handleInvalid();
    return;
  }

  const decimal = convertToDecimal(numberToConvert, currentBase);
  const convertedValue = convertFromDecimal(decimal, convertBase);

  displayAnswer(convertedValue);
});
