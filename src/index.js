const getValueByRowCol = (sudokuStr, row, col) => {
  // row, col, idx
  // 0, 0, 0
  // 0, 1, 1
  // 1, 0, 9
  // 1, 1, 10
  // 1, 8, 17
  // x, y, x*9+y

  const idx = row * 9 + col
  return sudokuStr[idx]
}

const forExport = { getValueByRowCol }

module.exports = forExport
