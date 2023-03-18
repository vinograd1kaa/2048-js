import { downChange, leftChange, rightChange, upChange } from "./move_functions.js";

const leadToNumbers = (arr) => {
  arr.forEach((row) => {
    row.forEach((cell, idx) => {
      if (typeof cell === "string") {
        row[idx] = Number(cell.slice(0, -1));
      }
    })
  })
  return arr;
}

export function move(arr, type) {
  switch (type) {
    case 'LEFT': {
      arr.forEach((row) => {
        row.forEach((cell, cellIdx) => {
          if (cell !== 0) {
            leftChange(row, cellIdx);
          }
        })
      })

      return arr;
    }

    case 'RIGHT': {
      arr.forEach((row) => {
        for (var cellIdx = row.length - 1; cellIdx >= 0; cellIdx--) {
          if (row[cellIdx] !== 0) {
            rightChange(row, cellIdx);
          }
        }
      })

      leadToNumbers(arr);

      return arr;
    }
    case 'UP': {
      arr.forEach((row, rowIdx) => {
        row.forEach((cell, cellIdx) => {
          if (cell !== 0) {
            upChange(arr, rowIdx, cellIdx);
          }
        })
      })

      leadToNumbers(arr);

      return arr;
    }

    case 'DOWN': {
      for (var rowIdx = arr.length - 1; rowIdx >= 0; rowIdx--) {
        arr[rowIdx].forEach((cell, cellIdx) => {
          if (cell >= 0) {
            downChange(arr, rowIdx, cellIdx);
          }
        })
      }

      leadToNumbers(arr);

      return arr;
    }

    default: return arr;
  }
}