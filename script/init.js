import { move } from "./helpers.js";

const [tileContainer, scoreContainer, scoreCounter, modal, restartButton, retryButton] =
  ['tile-container', 'score-container', 'score-counter', 'modal',  'restart-button', 'retry-button'].map((className) => {
      return document.querySelector(`.${className}`);
  })

document.addEventListener('keydown', function(event) {
  if (event.code.includes('Arrow')) {
    const type = event.code.slice(5, event.code.length).toUpperCase();

    renderPlayground(move(playground, type), false);
    calculateScore(playground, scoreCounter);
  }
});

restartButton.addEventListener('click', newGame);
retryButton.addEventListener('click', newGame);

let playground = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function renderPlayground(arr, newGame) {
  tileContainer.innerHTML = '';

  const emptyCells = arr.reduce((acc, row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      if (cell === 0) {
        return acc.push(`${rowIdx}${cellIdx}`);
      }
    })
    return acc;
  },  []);

  if (emptyCells.length === 0 && !isCellsMovable(arr)) {
    return modal.style.display = 'block';
  }

  if (emptyCells.length !== 0) {
    arr = spawnRandomCell(arr, newGame);
  }

  arr.forEach((row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      if (cell !== 0) {
        tileContainer.insertAdjacentHTML("beforeend", renderCustomCellHtml(rowIdx, cell, cellIdx));
      }
    })
  })
}

renderPlayground(playground, true);

function renderCustomCellHtml(row, cell, cellIdx) {
  const className = `tile tile-${cell} tile-position-${row}-${cellIdx}`;

  return `
    <div class="${className}">
      <div class="tile-inner">${cell}</div>
    </div>
  `
}

function newGame() {
  modal.style.display = 'none';
  scoreCounter.innerText = 0;

  playground = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  renderPlayground(playground, true);
}

function isCellsMovable(arr) {
  const availableMoveCells = arr.reduce((acc, row, rowIdx) => {
    row.forEach((cell, cellIdx) => {
      if (
        cell === row[cellIdx + 1] ||
        cell === row[cellIdx - 1] ||
        (arr[rowIdx - 1] && cell === arr[rowIdx - 1][cellIdx]) ||
        (arr[rowIdx + 1] && cell === arr[rowIdx + 1][cellIdx])
      ) {
        acc.push(true);
      }
    })
    return acc;
  }, [])

  return Boolean(availableMoveCells.length);
}

function calculateScore(arr, counter) {
  const score = arr.reduce((acc, row) => {
    row.forEach((cell) => {
      if (cell === 0 || cell === 2) return;
      return acc += cell;
    })

    return acc;
  } , 0);

  const increaseAmount = score - counter.innerText;

  if (increaseAmount !== 0) {
    const scoreAddition = document.querySelector('.score-addition');

    scoreContainer.insertAdjacentHTML("beforeend", `<div class="score-addition">+ ${increaseAmount}</div>`);
    scoreAddition.remove();
  }

  counter.innerText = score;
}

function spawnRandomCell(arr, newGame) {
  const emptyCells = arr.reduce((acc, row, rowIdx) => {
    row.forEach((cell, idx) => {
      if (cell === 0) {
        return acc.push(`${rowIdx}${idx}`);
      }
    })
    return acc;
  },  []);

  if (emptyCells.length !== 0) {
    const rand = Math.floor(Math.random() * emptyCells.length);
    const rowToChange = emptyCells[rand][0];
    const cellToChange = emptyCells[rand][1];

    arr[rowToChange][cellToChange] = 2;
  }

  if (newGame) {
    spawnRandomCell(arr);
  }

  return arr;
}








