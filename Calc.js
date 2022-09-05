//Variable declarations
const numberArray = document.querySelectorAll(".number");
const screen = document.getElementById('text');
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const operations = ['+', '-', '/', '*'];

let numberStorage;
let operationStorage;
let isThisTheFirstTime = true;



//Math function
let performOperation = function(num1 , num2) {
  let result;
  if (operationStorage === '+') {
    result = parseFloat(num1) + parseFloat(num2);
  } else if (operationStorage === '-') {
    result =  parseFloat(num1) - parseFloat(num2);
  } else if (operationStorage === '/') {
    result =  parseFloat(num1) / parseFloat(num2);
    if (num2 === '0') {
      screen.innerText = 'Error';
    }
  } else if (operationStorage === '*') {
    result = parseFloat(num1) * parseFloat(num2);
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
  if (screen.innerText === 'Error') {
    clearHandlerFunction();
  }
  screen.innerText = screen.innerText + this.innerText; 
};

let equalHandlerFunction = function() {
  if (screen.innerText === 'Error') {
    return;
  }
  var numInStorage = parseFloat(numberStorage);
  var numOnScreen = parseFloat(screen.innerText);
  if (operationStorage === '+') {
    screen.innerText = numInStorage + numOnScreen;
  } else if (operationStorage === '-') {
    screen.innerText = numInStorage - numOnScreen;
  } else if (operationStorage === '/') {
    screen.innerText = numInStorage / numOnScreen;
    if (numOnScreen === 0) {
      screen.innerText = 'Error';
    }
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

//Decimal handler function
let decimalHandlerFunction = function() {
  if (screen.innerText.includes('.')) {
    return;
  }
  screen.innerText = screen.innerText + '.';
}

//Back handler function
let backHandlerFunction = function() {
  if (screen.innerText === '') {
    return;
  }
  screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1);
}


//addEventListeners
document.getElementById('+').addEventListener('click', plusHandlerFunction);
document.getElementById('-').addEventListener('click', minusHandlerFunction);
document.getElementById('/').addEventListener('click', divideHandlerFunction);
document.getElementById('*').addEventListener('click', multiplyHandlerFunction);
document.getElementById('=').addEventListener('click', equalHandlerFunction);
document.getElementById('ac').addEventListener('click', clearHandlerFunction);
document.getElementById('.').addEventListener('click', decimalHandlerFunction);
document.getElementById('back').addEventListener('click', backHandlerFunction);
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


//negative issue 
//hitting enter does not work as equal