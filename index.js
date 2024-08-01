function createOperandButtons(leftContainerElement) {
    for (let i = 1; i <= 3; i++) {
        let rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for (let j = 1; j <= 3; j++) {
            let currDigit = (9 - (3 * i)) + j;
            let operandButtonElement = document.createElement('button');
            operandButtonElement.textContent = currDigit;
            rowElement.appendChild(operandButtonElement);
        }

        leftContainerElement.appendChild(rowElement);
    }

    const lastRowElement = document.createElement('div');
    lastRowElement.classList.add('row');

    const zeroButtonElement = document.createElement('button');
    zeroButtonElement.classList.add('dbl-width');
    zeroButtonElement.textContent = 0;

    const decimalButtonElement = document.createElement('button');
    decimalButtonElement.textContent = '.';

    lastRowElement.appendChild(zeroButtonElement);
    lastRowElement.appendChild(decimalButtonElement);

    leftContainerElement.appendChild(lastRowElement);
}

function addButtonFunctionality() {
    const buttonList = document.querySelectorAll('button');
    buttonList.forEach(button => {
        button.addEventListener('click', (e) => {
            operate(e.target.textContent);
        })
    });
}

const leftContainerElement = document.querySelector('#left-container');

createOperandButtons(leftContainerElement);
addButtonFunctionality();