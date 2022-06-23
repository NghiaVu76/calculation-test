const container = document.querySelector(".calculator");
const display = document.querySelector(".operator-display");
const result = document.querySelector(".result");
const keys = document.querySelector(".calculator-keys");

const calculator_buttons = [
  {
    name: "clear",
    label: "AC",
    formula: false,
    type: "key",
    class: "clear-button",
  },
  {
    name: "delete",
    label: "CE",
    formula: false,
    type: "key",
    class: "clear-button",
  },
  {
    name: "percentage",
    label: "%",
    formula: "/100",
    type: "key",
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

const createButtons = () => {
  var added_keys = 0;
  calculator_buttons.forEach((button, index) => {
    keys.innerHTML += `<button id="${button.name}" class="${button.class}">${button.label}</button>`;
    added_keys++;
  });
};
createButtons();
