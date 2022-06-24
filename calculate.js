const display = document.querySelector(".operator-display");
const result = document.querySelector(".result");
const keys = document.querySelector(".calculator-keys");

const calculator_buttons = [
  {
    name: "clear",
    label: "AC",
    formula: false,
    type: "action",
    class: "clear-button",
  },
  {
    name: "delete",
    label: "CE",
    formula: false,
    type: "action",
    class: "clear-button",
  },
  {
    name: "percentage",
    label: "%",
    formula: "/100",
    type: "operator",
    class: "key-operator",
  },
  {
    name: "divide",
    label: "/",
    formula: "/",
    type: "operator",
    class: "key-operator",
  },
  {
    name: "7",
    label: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    label: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    label: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "multiple",
    label: "x",
    formula: "*",
    type: "operator",
    class: "key-operator",
  },
  {
    name: "4",
    label: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    label: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    label: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "subtract",
    label: "-",
    formula: "-",
    type: "operator",
    class: "key-operator",
  },
  {
    name: "1",
    label: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    label: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    label: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "add",
    label: "+",
    formula: "+",
    type: "operator",
    class: "key-operator",
  },
  {
    name: "0",
    label: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "comma",
    label: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "equal",
    label: "=",
    formula: "=",
    type: "calculate",
    class: "key-equal",
  },
];

var data = {
  screenMemory: [],
  memory: [],
};

// add button
const createButtons = () => {
  calculator_buttons.forEach((button, index) => {
    keys.innerHTML += `<button id="${button.name}" class="${button.class}">${button.label}</button>`;
  });
};
createButtons();

// add event 'click'
keys.addEventListener("click", (e) => {
  const key = e.target;

  calculator_buttons.forEach((button) => {
    if (button.name == key.id) {
      return calculator(button);
    }
  });
});

var isNewCalculation = false; // check new calculation - kiểm tra xem có phải phép tính mới không

var calculator = (button) => {
  if (button.type == "operator") {
    data.screenMemory.push(button.label);
    data.memory.push(button.formula);
    isNewCalculation = false;
  } else if (button.type == "number" && isNewCalculation == false) {
    data.screenMemory.push(button.label);
    data.memory.push(button.formula);
  } else if (button.type == "number" && isNewCalculation == true) {
    data.screenMemory = []; //if a new calculation then clear screen
    data.memory = []; //if a new calculation then clear screen
    data.screenMemory.push(button.label);
    data.memory.push(button.formula);
    isNewCalculation = false;
  } else if (button.type == "action") {
    if (button.name == "clear") {
      data.screenMemory = [];
      data.memory = [];
      updateResult(0);
      isNewCalculation = false;
    } else if (button.name == "delete") {
      data.screenMemory.pop();
      data.memory.pop();
    }
  } else if (button.type == "calculate") {
    let memoryString = data.memory.join("");

    data.screenMemory = [];
    data.memory = [];

    let finalResult;
    let operatorCount = 0; // number of operators

    for (let i = 0; i <= memoryString.length; i++) {
      if (
        memoryString[i] == "+" ||
        memoryString[i] == "-" ||
        memoryString[i] == "*" ||
        memoryString[i] == "/"
      ) {
        operatorCount++;
      }
    }

    try {
      if (operatorCount == 1) {
        for (let i = 0; i <= memoryString.length; i++) {
          var leftNum = Number(memoryString.slice(0, i));
          var rightNum = Number(
            memoryString.slice(i + 1, memoryString.length + 1)
          );
          if (memoryString[i] === "+") {
            finalResult = leftNum + rightNum;
          } else if (memoryString[i] === "-") {
            finalResult = leftNum - rightNum;
          } else if (memoryString[i] === "*") {
            finalResult = leftNum * rightNum;
          } else if (memoryString[i] === "/") {
            finalResult = leftNum / rightNum;
          } else if (memoryString[i] === "%") {
            finalResult = finalResult / 100;
          }
        }
      } else if (operatorCount > 1) {
        finalResult = eval(memoryString);
      }
    } catch (error) {
      if (error instanceof Error) {
        finalResult = "Error!";
        updateResult(finalResult);
        return;
      }
    }

    finalResult = formatResult(finalResult); // format result

    data.screenMemory.push(finalResult); //save result for later if user perform consecutively
    data.memory.push(finalResult);

    updateResult(finalResult); // update output

    isNewCalculation = true; //set a new calculation

    return;
  }

  // remove screen when starting with zero
  if (data.screenMemory.join("").match(/^0\d+/)) {
    data.screenMemory.splice(-2, 1); //remove
  } else if (data.screenMemory.join("").match(/[^0-9\.]0\d+/)) {
    data.screenMemory.splice(-2, 1); //remove
  } else if (data.screenMemory.join("").match(/\.0/)) {
    data.screenMemory.join("");
  }
  updateOutputScreen(data.screenMemory.join(""));
};

const updateOutputScreen = (screenString) => {
  console.log(screenString);
  display.innerHTML = screenString;
};

const updateResult = (finalResult) => {
  result.innerHTML = finalResult;
};

const digitCounter = (number) => {
  return number.toString().length;
};

// func handle float result
const isFloat = (number) => {
  return number % 1 != 0;
};

const maxOutputLength = 10; // max output number length
const outputPrecision = 10; // calculate precision upto 10 digits

//format result func
const formatResult = (result) => {
  if (digitCounter(result) > maxOutputLength) {
    if (isFloat(result)) {
      const floatResult = parseFloat(result);
      const floatResultLength = digitCounter(floatResult);

      if (floatResultLength > maxOutputLength) {
        return result.toPrecision(outputPrecision);
      } else {
        const digitsAfterPoint = maxOutputLength - floatResultLength;
        return result.toFixed(digitsAfterPoint);
      }
    } else {
      return result.toPrecision(outputPrecision);
    }
  } else return result;
};
