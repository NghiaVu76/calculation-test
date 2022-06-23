const container = document.querySelector(".calculator");
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
  var added_keys = 0;
  calculator_buttons.forEach((button, index) => {
    keys.innerHTML += `<button id="${button.name}" class="${button.class}">${button.label}</button>`;
    added_keys++;
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

var calculator = (button) => {
  if (button.type == "operator") {
    data.screenMemory.push(button.label);
    data.memory.push(button.formula);
  } else if (button.type == "number") {
    data.screenMemory.push(button.label);
    data.memory.push(button.formula);
  } else if (button.type == "action") {
    if (button.name == "clear") {
      data.screenMemory = [];
      data.memory = [];
      updateResult(0);
    } else if (button.name == "delete") {
      data.screenMemory.pop();
      data.memory.pop();
    }
  } else if (button.type == "calculate") {
    let memoryArray = data.memory.join("");
    console.log(memoryArray);
    data.screenMemory = [];
    data.memory = [];

    let finalResult;

    try {
      for (let i = 0; i <= memoryArray.length; i++) {
        var leftNum = Number(memoryArray.slice(0, i));
        var rightNum = Number(memoryArray.slice(i + 1, memoryArray.length + 1));
        if (memoryArray[i] === "+") {
          finalResult = leftNum + rightNum;
        } else if (memoryArray[i] === "-") {
          finalResult = leftNum - rightNum;
        } else if (memoryArray[i] === "*") {
          finalResult = leftNum * rightNum;
        } else if (memoryArray[i] === "/") {
          finalResult = leftNum / rightNum;
        } else if (memoryArray[i] === "%") {
          finalResult = finalResult * 100;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        finalResult = "Syntax Error!";
        updateResult(finalResult);
        return;
      }
    }

    finalResult = formatResult(finalResult); // format result

    data.screenMemory.push(finalResult); //save result for later if user perform consecutively
    data.memory.push(finalResult);

    updateResult(finalResult); // update output
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

// func update screen
const updateOutputScreen = (screenString) => {
  console.log(screenString);
  display.innerHTML = screenString;
};

// func pdate result
const updateResult = (finalResult) => {
  result.innerHTML = finalResult;
};

// func count digits
const digitCounter = (number) => {
  return number.toString().length;
};

// func handle float result
const isFloat = (number) => {
  return number % 1 != 0;
};

const maxOutputLength = 10; // max output number length
const outputPrecision = 10; // calculate precision upto 5 digits

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
