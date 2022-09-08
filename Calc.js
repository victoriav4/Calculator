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
  if (screen.innerText.length === 11) {
    return;
  }
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
    //if number is greater than whatever
    if (numInStorage + numOnScreen > 999999999) {
      let scientific = (numInStorage + numOnScreen).toExponential(4);
      screen.innerText = scientific;
      } else {
        screen.innerText = numInStorage + numOnScreen;
      }
  } else if (operationStorage === '-') {
    if (numInStorage - numOnScreen > 999999999) {
      let scientific = (numInStorage - numOnScreen).toExponential(4);
      screen.innerText = scientific;
      } else {
        screen.innerText = numInStorage - numOnScreen;
      }
  } else if (operationStorage === '/') {
    if (numOnScreen === 0) {
      screen.innerText = 'Error';
    }
    if (numInStorage / numOnScreen > 999999999) {
      let scientific = (numInStorage / numOnScreen).toExponential(4);
      screen.innerText = scientific;
      } else {
        screen.innerText = numInStorage / numOnScreen;
      }
  } else if (operationStorage === '*') {
    if (numInStorage * numOnScreen > 999999999) {
      let scientific = (numInStorage * numOnScreen).toExponential(4);
      screen.innerText = scientific;
      } else {
        screen.innerText = numInStorage * numOnScreen;
      }
  }
  if (isThisTheFirstTime === true) {
    numberStorage = numOnScreen;
    isThisTheFirstTime = false;
  }
  // screen.innerText = performOperation(numberStorage, screen.innerText);
};

let clearHandlerFunction = function() {
  screen.innerText = '';
  numberStorage = undefined;
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


//negative issue 
//max character to be length of screen size