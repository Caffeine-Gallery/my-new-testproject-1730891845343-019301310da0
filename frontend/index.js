import { backend } from 'declarations/backend';

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    const expression = display.value;
    const [left, operator, right] = expression.match(/(-?\d+\.?\d*)([\+\-\*\/])(-?\d+\.?\d*)/).slice(1);

    try {
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(left), parseFloat(right));
                break;
            case '-':
                result = await backend.subtract(parseFloat(left), parseFloat(right));
                break;
            case '*':
                result = await backend.multiply(parseFloat(left), parseFloat(right));
                break;
            case '/':
                result = await backend.divide(parseFloat(left), parseFloat(right));
                break;
        }
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
};
