let input = document.getElementById('input');
let numbers = document.querySelectorAll('.numbers div');
let operators = document.querySelectorAll('.operators div');
let clear = document.getElementById('clear');
let result = document.getElementById('result');
let resultDisplayed = false;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function (e) {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
    

    if (resultDisplayed === false) {  //if there is no result in the display, keep adding values or operators.
        input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {  
        resultDisplayed = false;   //if there is an result in the display and user press an operator.
        input.innerHTML += e.target.innerHTML;   //to keep adding new strings for new operations.
    } else {
        resultDisplayed = false; //if there is an result and user pressed a number.
        input.innerHTML = "";  //to clear the input string and add new inputs to start a new operation
        input.innerHTML += e.target.innerHTML;
    }
    });
};

for (let i = 0; i < numbers.length; i++) {
    operators[i]?.addEventListener("click", function (e) {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") { //if the last character in the display is an operator, replace it with the new operator currently pressed.
        let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
    } else if (currentString.length == 0) {
        alert ("Digite um número antes de realizar uma operação.");  //data valitation to avoid any operation before a number is set.
    } else {
        input.innerHTML += e.target.innerHTML; //adding the operator pressed to the display.
    }
    })
};

result.addEventListener("click", function() { //Event listener to equal button.
    let inputString = input.innerHTML;  //this variable will process the numbers. For example: 10+15-2*4/3.
    let numbers = inputString.split(/\+|\-|\×|\÷/g); //this variable will form an array of numbers from the variable above. For example: ["10", "15", "2", "4", "3"].
    let operators = inputString.replace(/[0-9]|\./g, "").split(""); //this variable will form an array of operators from the variable inputString ( ["+", "-", "*", "/"] ) and then will replace numbers and dots with empty strings and then split. 


//looping through the array from input and doing an operation at a time. As it moves through the loop, it alter the original numbers and operators array. The final element in the array will be the output to be displayed.
    let divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    let multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    let substract = operators.indexOf("-");
    while (substract != -1) {
        numbers.splice(substract, 2, numbers[substract] - numbers[substract + 1]);
        operators.splice(substract, 1);
        substract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0]; //To display the output
    resultDisplayed = true;
});

clear.addEventListener("click", function() { //to clear the display on press of "C".
    input.innerHTML = "";
});
