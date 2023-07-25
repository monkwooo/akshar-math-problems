const randomInt = max => parseInt(Math.random() * max);
const choose = items => items[randomInt(items.length)];
function generateProblem(digitNumber) {
    const maxNumber = Math.pow(10, digitNumber);
    const firstNumber = randomInt(maxNumber) || randomInt(maxNumber) || 1;
    const operator = choose(['-', '+']);
    if (operator == '-') {
        secondNumber = randomInt(firstNumber)
        answer = firstNumber - secondNumber;
    } else {
        secondNumber = randomInt(maxNumber);
        answer = firstNumber + secondNumber;
    }
    return {
        firstNumber,
        secondNumber,
        operator,
        userInput: '',
        answer
    }
}
exports = { generateProblem }