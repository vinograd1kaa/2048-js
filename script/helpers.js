import { downChange, leftChange, rightChange, upChange } from "./move_functions.js";

const leadToNumbers = (obj) => {
  Object.keys(obj).forEach((row) => {
    const result = obj[row].map((cell) => {
      if (typeof cell === "string") {
        return Number(cell.slice(0, -1));
      }
      return cell;
    })

    obj[row] = result;
  })

  return obj;
}

export function move(obj, type) {
  switch (type) {
    case 'LEFT': {
      Object.keys(obj).forEach((row) => {
        obj[row].map((cell, idx) => {
          if (cell !== 0) {
            leftChange(obj[row], idx);
          }
        })
      })

      return obj;
    }

    case 'RIGHT': {
      Object.keys(obj).forEach((row) => {
        for (var idx = obj[row].length - 1; idx >= 0; idx--) {
          const cell = obj[row][idx];

          if (cell !== 0) {
            rightChange(obj[row], idx);
          }
        }
      })

      leadToNumbers(obj);

      return obj;
    }
    case 'UP': {
      Object.keys(obj).forEach((row) => {
        obj[row].map((cell, idx) => {
          if (cell !== 0) {
            upChange(obj, row, idx);
          }
        })
      })

      leadToNumbers(obj);

      return obj;
    }

    case 'DOWN': {
      for (var row = Object.keys(obj).length - 1; row >= 0; row--) {
        obj[row].map((cell, idx) => {
          if (cell >= 0) {
            downChange(obj, row, idx);
          }
        })
      }

      leadToNumbers(obj);

      return obj;
    }

    default: return 'invalid type';
  }
}