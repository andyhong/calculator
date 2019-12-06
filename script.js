const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const del = document.querySelector('#del');
const dot = document.querySelector('#dot');
const clear = document.querySelector("#clear");
let displayValue = 0;

const add = function (x, y) {
    return x + y;
};

const subtract = function (x, y) {
    return x - y;
};

const multiply = function (x, y) {
    return x * y;
};

const divide = function (x, y) {
    return x / y;
};

const operate = function (x, y, z) {
    return z(x, y);
};

const updateDisplay = function (x) {
    display.textContent = x;
}

const clearDisplay = function () {
    display.textContent = 0;
}

clear.addEventListener('click', clearDisplay);

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (display.textContent == 0) {
            display.textContent = '';
        }
        display.textContent += number.textContent;
    });
});

del.addEventListener('click', () => {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0,(display.textContent.length-1));
    }
    else if (display.textContent.length == 1) {
        display.textContent = 0;
    }
});

dot.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        display.textContent += dot.textContent;
    }
});