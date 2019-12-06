const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
const del = document.querySelector('#del');
const dot = document.querySelector('#dot');
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

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (number.textContent == "." && display.textContent == 0){
            display.textContent += number.textContent;
        }
        else if (number.textContent == 0 && display.textContent == 0) {

        }
        else if (display.textContent == 0) {
            display.textContent = '';
            display.textContent += number.textContent;
        }
        else {
            display.textContent += number.textContent;
        }
    });
});

del.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,(display.textContent.length-1));
});