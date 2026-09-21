const display = document.getElementById('display');
const historyEl = document.getElementById('history');

let current = '0';
let previous = null;
let operator = null;
let justEvaluated = false;

function updateScreen() {
  display.textContent = current;
  historyEl.textContent = previous !== null && operator
    ? `${previous} ${operator}`
    : '';
}

function inputDigit(digit) {
  if (justEvaluated) {
    current = digit;
    justEvaluated = false;
  } else {
    current = current === '0' ? digit : current + digit;
  }
}

function inputDecimal() {
  if (justEvaluated) {
    current = '0.';
    justEvaluated = false;
    return;
  }
  if (!current.includes('.')) current += '.';
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  justEvaluated = false;
}

function toggleSign() {
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
}

function applyPercent() {
  current = String(parseFloat(current) / 100);
}

function compute(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? 'Error' : a / b;
    default: return b;
  }
}

function formatResult(value) {
  if (value === 'Error') return value;
  if (!isFinite(value)) return 'Error';
  const rounded = Math.round(value * 1e10) / 1e10;
  return String(rounded);
}

function handleOperator(nextOp) {
  if (operator && previous !== null && !justEvaluated) {
    const result = compute(previous, current, operator);
    current = formatResult(result);
  }
  previous = current;
  operator = nextOp;
  justEvaluated = false;
  current = '0';
  display.textContent = previous;
  historyEl.textContent = `${previous} ${operator}`;
}

function handleEquals() {
  if (operator === null || previous === null) return;
  const result = compute(previous, current, operator);
  historyEl.textContent = `${previous} ${operator} ${current} =`;
  current = formatResult(result);
  previous = null;
  operator = null;
  justEvaluated = true;
  display.textContent = current;
  return;
}

document.querySelectorAll('.key').forEach((btn) => {
  btn.addEventListener('click', () => {
    const num = btn.dataset.num;
    const action = btn.dataset.action;

    if (num !== undefined) {
      inputDigit(num);
      updateScreen();
      return;
    }

    switch (action) {
      case 'clear':
        clearAll();
        updateScreen();
        break;
      case 'sign':
        toggleSign();
        updateScreen();
        break;
      case 'percent':
        applyPercent();
        updateScreen();
        break;
      case 'decimal':
        inputDecimal();
        updateScreen();
        break;
      case 'op':
        handleOperator(btn.dataset.op);
        break;
      case 'equals':
        handleEquals();
        break;
    }
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    inputDigit(e.key);
    updateScreen();
  } else if (e.key === '.') {
    inputDecimal();
    updateScreen();
  } else if (e.key === '+' ) {
    handleOperator('+');
  } else if (e.key === '-') {
    handleOperator('−');
  } else if (e.key === '*') {
    handleOperator('×');
  } else if (e.key === '/') {
    e.preventDefault();
    handleOperator('÷');
  } else if (e.key === 'Enter' || e.key === '=') {
    handleEquals();
  } else if (e.key === 'Escape') {
    clearAll();
    updateScreen();
  } else if (e.key === 'Backspace') {
    current = current.length > 1 ? current.slice(0, -1) : '0';
    updateScreen();
  }
});

updateScreen();
