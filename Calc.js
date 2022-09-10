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
      result = 'Error';
    }
  } else if (operationStorage === '*') {
    result = parseFloat(num1) * parseFloat(num2);
  }
  return result.toString();
};


//Operation colors 
let removeOperationColor = function () {
  if (operationStorage !== undefined && operationStorage !== '') {
    document.getElementById(operationStorage).classList.remove('highlight');
  } 
}

let addOperationColor = function (currentOperation) {
  document.getElementById(currentOperation).classList.add('highlight');
}


//event handler functions
let plusHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  removeOperationColor();
  operationStorage = '+';
  addOperationColor('+');
  screen.innerText = '';
};

let minusHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  removeOperationColor();
  operationStorage = '-';
  addOperationColor('-');
  screen.innerText = '';
}; 

let divideHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  removeOperationColor();
  operationStorage = '/';
  addOperationColor('/');
  screen.innerText = '';
};


let multiplyHandlerFunction = function() {
  if (numberStorage !== undefined) {
    numberStorage = performOperation(numberStorage, screen.innerText);
  } else {
    numberStorage = screen.innerText;
  }
  removeOperationColor();
  operationStorage = '*';
  addOperationColor('*');
  screen.innerText = '';
};

let numberButtonHandlerFunction = function() {
  if (screen.innerText.length === 11) {
    return;
  }
  if (screen.innerText === 'Error') {
    clearHandlerFunction();
  }
  screen.innerText = screen.innerText + this.innerText; 
};

let clearHandlerFunction = function() {
  screen.innerText = '';
  numberStorage = undefined;
  removeOperationColor();
  operationStorage = '';
  isThisTheFirstTime = true;
}

let decimalHandlerFunction = function() {
  if (screen.innerText.length > 9) {
    return;
  }
  if (screen.innerText.includes('.')) {
    return;
  }
  screen.innerText = screen.innerText + '.';
}

let backHandlerFunction = function() {
  if (screen.innerText === '') {
    return;
  }
  screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1);
}

let equalHandlerFunction = function() {
  removeOperationColor();
  if (screen.innerText === 'Error') {
    return;
  }
  let number2 = screen.innerText;
  let result = performOperation(numberStorage, number2);
  
  if (isThisTheFirstTime === false && operationStorage === '-') {
    result = performOperation(number2, numberStorage);
  }
  //flip the order if this is the not the first minus operation
  if (isThisTheFirstTime === true) {
    numberStorage = number2;
    isThisTheFirstTime = false;
  }

  if (result > 99999999999) {
    result = parseFloat(result).toExponential(4).toString();
  }

  if (result.length > 11) {
    currentIndex = result.indexOf('.');
    result = parseFloat(result).toFixed(10 - currentIndex).toString();
  }
  screen.innerText = result;
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
    if (screen.innerText.length === 11) {
      return;
    }
    screen.innerText = screen.innerText + event['key'];
  }
  if (operations.includes(event['key']) === true) {
    if (numberStorage !== undefined) {
      numberStorage = performOperation(numberStorage, screen.innerText);
    } else {
      numberStorage = screen.innerText;
    }
    operationStorage = event['key'];
    screen.innerText = '';
  }
  if (event.key === '=' || event.key === 'Enter') {
    event.preventDefault();
    equalHandlerFunction();
  }
  if (event.key === 'Backspace') {
    backHandlerFunction();
  }
});


//add event listeners to all the buttons
for(var i = 0; i < numberArray.length; i++) {
  numberArray[i].addEventListener('click', numberButtonHandlerFunction);
};
