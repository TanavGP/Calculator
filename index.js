const DIV_BY_ZERO_MSG = "NOOOOOOOOOOOO!";
const MOD_BY_ZERO_MSG = "WUUUUPSIIIEEE!";

let precedence = {
    "+" : 1,
    "-" : 1,
    "/" : 2,
    "*" : 2,
    "%" : 2
};

const expression = new Array();

function isOperator(token) {
    return (token === "+" || token === "-" || token === "*" || token === "/" || token === "%");
}

function isDigit(token) {
    return !isNaN(token);
}

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
            console.log("clicked a button!");
        })
    });
}

function updateResultDisplay() {
    const resultDisplayElement = document.querySelector('#result-display');
    resultDisplayElement.textContent = expression.toString().replace(/,/g, ' ');
}

function operate(token) {
    token = token.toString().trim();
    if (token === "C") {
        expression.length = 0;
        updateResultDisplay();
    }
    else if (token === "=") {
        const result = evaluatePostfix(infixToPostfix(expression));
        expression.length = 0;
        expression.push(result);
        updateResultDisplay();
    }
    else if (isOperator(token)) {
        if (expression.length == 0) {
            if (token === "-" || token === "+") {
                expression.push(token);
                updateResultDisplay();
            }
        }
        else if (isOperator(expression[expression.length - 1])) {
            expression.length -= 1;
            expression.push(token);
            updateResultDisplay();
        }
        else {    
            expression.push(token);
            updateResultDisplay();
        }
    }
    else if (isDigit(token)) {
        if (expression.length === 0 || isOperator(expression[expression.length - 1])) {
            expression.push(token);
            updateResultDisplay();
        }
        else {
            expression[expression.length - 1] += token;
            updateResultDisplay();
        }
    }
    /*
    // UNFINISHED
    else if (token === "+/-") {
        if (expression.length === 0) {
            return;
        } 
        else if (expression[expression.length - 1] === "+") {
            expression[expression.length - 1] = "-";
            updateResultDisplay();
        }
        else if (expression[expression.length - 1] === "-") {
            expression[expression.length - 1] = "+";
            updateResultDisplay();
        }
        else if (isDigit(expression[expression.length - 1])) {
            expression[expression.length - 1] = ""
        }
    }
    */
}

function infixToPostfix(infix) {
    const operator = new Array();
    const postfix = new Array();

    infix.forEach(token => {
        if (isOperator(token)) {
            while (operator.length > 0 && precedence[operator[operator.length - 1]] >= precedence[token]) {
                postfix.push(operator[operator.length - 1]);
                operator.pop();
            }
            operator.push(token);
        }
        else {
            postfix.push(token);
        }
    });
    while(operator.length > 0) {
        postfix.push(operator[operator.length - 1]);
        operator.pop();
    }

    return postfix;
}

function evaluatePostfix(postfix) {
    const tempStack = new Array();
    let errorMSG = "";
    let errorFlag = false;
    postfix.forEach(token => {
        if (!errorFlag && isOperator(token)) {
            const num2 = BigInt(tempStack[tempStack.length - 1]);
            tempStack.pop();
            const num1 = BigInt(tempStack[tempStack.length - 1]);
            tempStack.pop();

            let result = BigInt(-1);
            switch(token) {
                case "+" : result = num1 + num2; break;
                case "-" : result = num1 - num2; break;
                case "*" : result = num1 * num2; break;
                case "/" : 
                    if (num2 === BigInt(0)) {
                        errorMSG = DIV_BY_ZERO_MSG;
                        errorFlag = true;
                    }  
                    else {
                        result = num1 / num2;
                    }
                    break;
                case "%" : 
                    if (num2 === BigInt(0)) {
                        errorMSG = MOD_BY_ZERO_MSG;
                        errorFlag = true;
                    }
                    else {
                        result = num1 % num2;
                    }
                    break;
            }
            if (!errorFlag) {
                tempStack.push(result.toString());
            }
        }
        else {
            tempStack.push(token);
        }
    })
    
    if (errorFlag) {
        return errorMSG;
    }
    return tempStack.length === 0 ? "EMPTY" : tempStack[0];
}

const leftContainerElement = document.querySelector('#left-container');

createOperandButtons(leftContainerElement);
addButtonFunctionality();