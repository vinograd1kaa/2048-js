export const rightChange = (row, cell) => {
  if (row[cell + 1] === 0) {
    row[cell + 1] = row[cell];
    row[cell] = 0;

    return rightChange(row, cell + 1);
  }
  else if (row[cell + 1] === row[cell]) {
    row[cell + 1] += row[cell];
    row[cell + 1] += 'c';
    row[cell] = 0;
  }

  return row;
};

export const leftChange = (row, cell) => {
  if (row[cell - 1] === 0) {
    row[cell - 1] = row[cell];
    row[cell] = 0;

    return leftChange(row, cell - 1);
  }

  else if (row[cell - 1] === row[cell]) {
    row[cell - 1] += row[cell];
    row[cell] = 0;
  }

  return row;
};

export const upChange = (arr, row, cell) => {
  if (!arr[row - 1]) return arr;

  if (arr[row - 1][cell] === 0) {
    arr[row - 1][cell] = arr[row][cell];
    arr[row][cell] = 0;

    return upChange(arr, row - 1, cell);
  }

  else if (arr[row - 1][cell] === arr[row][cell]) {
    arr[row - 1][cell] += arr[row][cell];
    arr[row - 1][cell] += 'c';
    arr[row][cell] = 0;
  }

  return arr;
};

export const downChange = (arr, row, cell) => {
  if (!arr[row + 1]) return arr;

  if (arr[row + 1][cell] === 0) {
    arr[row + 1][cell] = arr[row][cell];
    arr[row][cell] = 0;

    return downChange(arr, row + 1, cell);
  }

  else if (arr[row + 1][cell] === arr[row][cell]) {
    arr[row + 1][cell] += arr[row][cell];
    arr[row + 1][cell] += 'c';
    arr[row][cell] = 0;
  }

  return arr;
};