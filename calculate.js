let outputScreen = document.getElementById("output-screen");

// for output
// hiển thị
function display(num) {
  outputScreen.value += num;
}

// for operator
// các phép tính
function calculate() {
  try {
    outputScreen.value = eval(outputScreen.value);
  } catch (err) {
    alert("Invalid");
  }
}

// for clear and delete
// hàm dọn dẹp và xóa
function Clear() {
  outputScreen.value = "";
}

function del() {
  outputScreen.value = outputScreen.value.slice(0, -1);
}
