//Variable declarations
const numberArray = document.querySelectorAll(".number");
const screen = document.getElementById('screen');
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operations = ['+', '-', '/', '*'];

let numberStorage;
let operationStorage;
let isThisTheFirstTime = true;



//Math function
let performOperation = function(num1 , num2) {
  let result;
  if (operationStorage === '+') {
    result = parseInt(num1) + parseInt(num2);
  } else if (operationStorage === '-') {
    result =  parseInt(num1) - parseInt(num2);
  } else if (operationStorage === '/') {
    result =  parseInt(num1) / parseInt(num2);
  } else if (operationStorage === '*') {
    result = parseInt(num1) * parseInt(num2);
  }
  return result.toString();
};


//event handler functions
let plusHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  operationStorage = '+';
  screen.innerText = '';
};

let minusHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  operationStorage = '-';
  screen.innerText = '';
}; 

let divideHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  operationStorage = '/';
  screen.innerText = '';
};

let multiplyHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  operationStorage = '*';
  screen.innerText = '';
};

let numberButtonHandlerFunction = function() {
  screen.innerText = screen.innerText + this.innerText; 
};

let equalHandlerFunction = function() {
  var numInStorage = parseInt(numberStorage);
  var numOnScreen = parseInt(screen.innerText);
  if (operationStorage === '+') {
    screen.innerText = numInStorage + numOnScreen;
  } else if (operationStorage === '-') {
    screen.innerText = numInStorage - numOnScreen;
  } else if (operationStorage === '/') {
    screen.innerText = numInStorage / numOnScreen;
  } else if (operationStorage === '*') {
    screen.innerText = numInStorage * numOnScreen;
  }
  if (isThisTheFirstTime === true) {
    numberStorage = numOnScreen;
    isThisTheFirstTime = false;
  }
  // screen.innerText = performOperation(numberStorage, screen.innerText);
};

//Clear handler function
let clearHandlerFunction = function() {
  screen.innerText = '';
  numberStorage = undefined;
  operationStorage = '';
  isThisTheFirstTime = true;
}


//addEventListeners
document.getElementById('+').addEventListener('click', plusHandlerFunction);
document.getElementById('-').addEventListener('click', minusHandlerFunction);
document.getElementById('/').addEventListener('click', divideHandlerFunction);
document.getElementById('*').addEventListener('click', multiplyHandlerFunction);
document.getElementById('=').addEventListener('click', equalHandlerFunction);
document.getElementById('ac').addEventListener('click', clearHandlerFunction);
document.addEventListener('keydown', function (event) {
  if (numbers.includes(event['key']) === true) {
    screen.innerText = screen.innerText + event['key'];
  }
  if (operations.includes(event['key']) === true) {
    if (numberStorage !== undefined) {
      numberStorage = performOperation(numberStorage, screen.innerText);
    }
    numberStorage = screen.innerText;
    operationStorage = event['key'];
    screen.innerText = '';
  }
  if (event.key === '=') {
   equalHandlerFunction();
  }
});


//add event listeners to all the buttons
for(var i = 0; i < numberArray.length; i++) {
  numberArray[i].addEventListener('click', numberButtonHandlerFunction);
};


//make sure clear clears all stored data as well as current data

//display error message if trying to divide by 0

//make sure no more than one decimal can be inputed in a single input

//add a backspace button
