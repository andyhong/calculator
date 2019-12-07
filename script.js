const result = document.querySelector('.result');
const history = document.querySelector('.history');
const numbers = document.querySelectorAll('.number');
const del = document.querySelector('#del');
const dot = document.querySelector('#dot');
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const plusminus = document.querySelector('#plusminus');
const operators = document.querySelectorAll(".operator");

let calculation = {
    memory: null,
    previousOperand: null,
    previousOperator: null,
    nextOperand: null,
    nextOperator: null,
    waitingForNextOperand: true,
}

const compute = function () {
    let result;
    switch (calculation.previousOperator) {
        case '+':
            result = Number(calculation.previousOperand) + Number(calculation.nextOperand);
            break
        case '−':
            result = Number(calculation.previousOperand) - Number(calculation.nextOperand);
            break
        case '×':
            result = Number(calculation.previousOperand) * Number(calculation.nextOperand);
            break
        case '÷':
            result = Number(calculation.previousOperand) / Number(calculation.nextOperand);
            break
    }

    calculation.memory = result;
    calculation.previousOperand = result;
    calculation.previousOperator = calculation.nextOperator;
    calculation.nextOperand = null;
    calculation.nextOperator = null;
    calculation.waitingForNextOperand = false;
}

const clearDisplay = function () {
    result.textContent = 0;
    calculation = {
        memory: null,
        previousOperand: null,
        previousOperator: null,
        nextOperand: null,
        nextOperator: null,
        waitingForNextOperand: true,
    }
    history.textContent = '';
    enableButtons();
}

const disableButtons = function () {
    numbers.forEach(number => {
        number.disabled = true;
    });
    operators.forEach(operator => {
        operator.disabled = true;
    });
    del.disabled = true;
    plusminus.disabled = true;
    equals.disabled = true;
    dot.disabled = true;
};

const enableButtons = function () {
    numbers.forEach(number => {
        number.disabled = false;
    });
    operators.forEach(operator => {
        operator.disabled = false;
    });
    del.disabled = false;
    plusminus.disabled = false;
    equals.disabled = false;
    dot.disabled = false;
};

const checkOperators = function () {
    for (i = 0; i < operators.length; i++) {
        if (operators[i].classList.contains('active')) {
            return true;
        }
    }
};

const removeOperators = function () {
    for (i = 0; i < operators.length; i++) {
        if (operators[i].classList.remove('active')) {
            return true;
        }
    }
};

//clears display
clear.addEventListener('click', clearDisplay);

// clicking numbers
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (result.textContent == 0 && !result.textContent.includes('.')) {
            result.textContent = '';
        }
        if (checkOperators()) {
            result.textContent = '';
            removeOperators();
        }
        if (calculation.waitingForNextOperand == false) {
            result.textContent = '';
            calculation.waitingForNextOperand = true;
        }
        result.textContent += number.textContent;
    });
});

// delete button interaction
del.addEventListener('click', () => {
    if (result.textContent.length > 1) {
        result.textContent = result.textContent.slice(0,(result.textContent.length-1));
    }
    else if (result.textContent.length == 1) {
        result.textContent = 0;
    }
});

// decimal point interaction
dot.addEventListener('click', () => {
    if (!result.textContent.includes('.')) {
        result.textContent += dot.textContent;
    }
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (calculation.waitingForNextOperand == true && calculation.previousOperand != null) {
            calculation.nextOperand = result.textContent;
            calculation.nextOperator = operator.textContent;
            history.textContent += ` ${calculation.nextOperand} ${calculation.nextOperator}`;
            compute();
            result.textContent = calculation.memory;
        }

        if (calculation.previousOperand == null) {
            calculation.previousOperand = result.textContent;
            calculation.previousOperator = operator.textContent;
            calculation.waitingForNextOperand = false;
            history.textContent += `${calculation.previousOperand} ${calculation.previousOperator}`;
        }
    });   
});

equals.addEventListener('click', () => {
    if (calculation.waitingForNextOperand !== false && calculation.previousOperator !== null) {
        calculation.nextOperand = result.textContent;
        history.textContent += ` ${calculation.nextOperand}`;
        compute();
        result.textContent = calculation.memory;
        disableButtons();
    }
});

plusminus.addEventListener('click', () => {
    if (calculation.waitingForNextOperand == true) {
        result.textContent = result.textContent * -1;
    }
});
