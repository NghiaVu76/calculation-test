let outputScreen = document.getElementById("output-screen");

let isNew = true;
// for output
// hiển thị
function display(num) {
  if (isNew) {
    outputScreen.value += num;
  } else {
    outputScreen.value = "";
    outputScreen.value += num;
  }
}

//for operator display

function operator(ope) {
  isNew = true;
  outputScreen.value += ope;
}

// for operator
// các phép tính
function calculate() {
  try {
    console.log(outputScreen.value);
    outputScreen.value = eval(outputScreen.value);
    console.log(outputScreen.value);
    isNew = false;
  } catch (err) {
    alert("Invalid");
  }
}

// for clear and delete
// hàm dọn dẹp và xóa
function Clear() {
  outputScreen.value = "";
  isNew = true;
}

function del() {
  outputScreen.value = outputScreen.value.slice(0, -1);
  isNew = true;
}
