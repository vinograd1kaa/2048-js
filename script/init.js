import { move } from "./helpers.js";

const [tileContainer, scoreContainer, scoreCounter, modal, restartButton, retryButton] =
  ['tile-container', 'score-container', 'score-counter', 'modal',  'restart-button', 'retry-button'].map((className) => {
      return document.querySelector(`.${className}`);
  })

document.addEventListener('keydown', function(event) {
  if (event.code.includes('Arrow')) {
    const type = event.code.slice(5, event.code.length).toUpperCase();

    renderPlayground(move(playgroundObj, type), false);
    calculateScore(playgroundObj, scoreCounter);
  }
});

restartButton.addEventListener('click', newGame);
retryButton.addEventListener('click', newGame);

let playgroundObj = {
  0: [0, 0, 0, 0],
  1: [0, 0, 0, 0],
  2: [0, 0, 0, 0],
  3: [0, 0, 0, 0],
};

function renderPlayground(obj, newGame) {
  tileContainer.innerHTML = '';

  const emptyCells = Object.keys(obj).reduce((acc, row) => {
    obj[row].forEach((cell, idx) => {
      if (cell === 0) {
        return acc.push(`${row}${idx}`);
      }
    })
    return acc;
  },  []);

  if (emptyCells.length === 0 && !isCellsMovable(obj)) {
    return modal.style.display = 'block';
  }

  if (emptyCells.length !== 0) {
    obj = spawnRandomCell(obj, newGame);
  }

  Object.keys(obj).forEach((row) => {
    obj[row].forEach((cell, idx) => {
      if (cell !== 0) {
        tileContainer.insertAdjacentHTML("beforeend", renderCustomCellHtml(row, cell, idx));
      }
    })
  })
}

renderPlayground(playgroundObj, true);

function renderCustomCellHtml(row, cell, idx) {
  const className = `tile tile-${cell} tile-position-${row}-${idx}`;

  return `
    <div class="${className}">
      <div class="tile-inner">${cell}</div>
    </div>
  `
}

function newGame() {
  modal.style.display = 'none';
  scoreCounter.innerText = 0;

  playgroundObj = {
    0: [0, 0, 0, 0],
    1: [0, 0, 0, 0],
    2: [0, 0, 0, 0],
    3: [0, 0, 0, 0],
  };

  renderPlayground(playgroundObj, true);
}

function isCellsMovable(obj) {
  const availableMoveCells = Object.keys(obj).reduce((acc, row) => {
    obj[row].forEach((cell, idx) => {
      if (
        obj[row][idx] === obj[row][idx + 1] ||
        obj[row][idx] === obj[row][idx - 1] ||
        (obj[row - 1] && obj[row][idx] === obj[row - 1][idx]) ||
        (obj[row + 1] && obj[row][idx] === obj[row + 1][idx])
      ) {
        acc.push(true);
      }
    })
    return acc;
  }, [])

  return Boolean(availableMoveCells.length);
}

function calculateScore(obj, counter) {
  const score = Object.keys(obj).reduce((acc, row) => {
    obj[row].forEach((cell) => {
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

function spawnRandomCell(obj, newGame) {
  const emptyCells = Object.keys(obj).reduce((acc, row) => {
    obj[row].forEach((cell, idx) => {
      if (cell === 0) {
        return acc.push(`${row}${idx}`);
      }
    })
    return acc;
  },  []);

  if (emptyCells.length !== 0) {
    const rand = Math.floor(Math.random() * emptyCells.length);
    const rowToChange = emptyCells[rand][0];
    const cellToChange = emptyCells[rand][1];

    obj[rowToChange][cellToChange] = 2;
  }

  if (newGame) {
    spawnRandomCell(obj);
  }

  return obj;
}








