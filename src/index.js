const getValueByRowCol = (sudokuStr, row, col) => {
  // row, col, idx
  // 0, 0, 0
  // 0, 1, 1
  // 1, 0, 9
  // 1, 1, 10
  // 1, 8, 17
  // x, y, x*9+y

  if (0 > row || 9 <= row) {
    throw RangeError('Row must be >= 0 and < 9')
  }
  if (0 > col || 9 <= col) {
    throw RangeError('Col must be >= 0 and < 9')
  }
  const idx = getIndexByRowCol(row, col)
  return sudokuStr[idx]
}

const getIndexByRowCol = (row, col) => {
  return row * 9 + col
}

const getRowColByIndex = idx => {
  return [Math.trunc(idx / 9), idx % 9]
}

const forExport = { getValueByRowCol }

module.exports = forExport
