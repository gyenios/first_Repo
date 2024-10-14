// Get the display element
const display = document.getElementById('display');

// Store current input and previous input
let currentInput = '';
let previousInput = '';
let operation = null;

// Handle button presses
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (value === '+' || value === '-' || value === 'x' || value === '/') {
            handleOperation(value);
        } else if (value === 'DEL') {
            deleteLast();
        } else if (value === 'RESET') {
            reset();
        } else if (value === '=') {
            calculate();
        }
    });
});

// Handle number input
function handleNumber(num) {
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) return;

    currentInput += num;
    display.textContent = currentInput;
}

// Handle operation input
function handleOperation(op) {
    if (currentInput === '') return; // Prevent operation without a number
    if (previousInput !== '') calculate(); // Calculate before chaining operations

    operation = op;
    previousInput = currentInput;
    currentInput = ''; // Reset current input for the next number
}

// Handle delete button
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
}

// Handle reset button
function reset() {
    currentInput = '';
    previousInput = '';
    operation = null;
    display.textContent = '0';
}

// Perform the calculation
function calculate() {
    if (currentInput === '' || previousInput === '') return; // Nothing to calculate

    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    operation = null;
    display.textContent = currentInput;
}
