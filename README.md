# Calculator — Level 1, Task 3

A working calculator built with HTML, CSS, and vanilla JavaScript,
styled to look like a small desk calculator with an LED-style display.

## Features

- Addition, subtraction, multiplication, and division
- Decimal input, sign toggle (±), and percent (%)
- Running history line above the main display, showing the pending operation
- Divide-by-zero shows `Error` instead of crashing
- Full keyboard support: digits, `+ - * /`, `Enter`/`=`, `Backspace`, `Esc` to clear

## Files

03-calculator/
├── index.html
├── style.css
├── script.js
└── README.md

## How to use

Open `index.html` in any browser — no build step or dependencies. Click
the buttons or use the keyboard.

## How it works

- `script.js` keeps three pieces of state: the current entry, the stored
  previous value, and the pending operator.
- Pressing an operator key evaluates any pending calculation first, so
  chained operations (e.g. `4 + 5 × 2`) behave left-to-right like a
  simple calculator rather than following order of operations.
- `=` evaluates the pending operation and locks the result until a new
  digit is typed.

## Built with

- HTML5
- CSS3 (CSS Grid for the keypad, custom properties for theming)
- Vanilla JavaScript (no libraries)
