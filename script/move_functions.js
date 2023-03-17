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

export const upChange = (obj, row, cell) => {
  if (!obj[row - 1]) return obj;

  if (obj[row - 1][cell] === 0) {
    obj[row - 1][cell] = obj[row][cell];
    obj[row][cell] = 0;

    return upChange(obj, row - 1, cell);
  }

  else if (obj[row - 1][cell] === obj[row][cell]) {
    obj[row - 1][cell] += obj[row][cell];
    obj[row - 1][cell] += 'c';
    obj[row][cell] = 0;
  }

  return obj;
};

export const downChange = (obj, row, cell) => {
  if (!obj[row + 1]) return obj;

  if (obj[row + 1][cell] === 0) {
    obj[row + 1][cell] = obj[row][cell];
    obj[row][cell] = 0;

    return downChange(obj, row + 1, cell);
  }

  else if (obj[row + 1][cell] === obj[row][cell]) {
    obj[row + 1][cell] += obj[row][cell];
    obj[row + 1][cell] += 'c';
    obj[row][cell] = 0;
  }

  return obj;
};