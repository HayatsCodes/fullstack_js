let num1 = 8;
let num2 = 2;
let result = 0;
document.getElementById("num1-el").textContent = num1;
document.getElementById("num2-el").textContent = num2;

// Create four functions: add(), subtract(), divide(), multiply()
function add() {
    result = num1 + num2;
}

function subtract() {
    result = num1 - num2;
}

function divide() {
    result = num1 / num2;
}
function multiply() {
    result = num1 * num2;
}
// Call the correct function when the user clicks on one of the buttons
// Perform the given calculation using num1 and num2
// Render the result of the calculation in the paragraph with id="sum-el"
sumEl.innerText = result;
// E.g. if the user clicks on the "Plus" button, you should render
// "Sum: 10" (since 8 + 2 = 10) inside the paragraph with id="sum-el"


