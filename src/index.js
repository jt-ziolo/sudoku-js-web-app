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

const getInvalidIdxsBySquaresRule = sudokuStr => {
  // the following array represents all delta values which, when added to the
  // index of the top left corner of a 3x3 square in the sudoku grid, will
  // yield all 9 digits within the 3x3 square
  const squareIdxDelta = [
    getIndexByRowCol(0, 0),
    getIndexByRowCol(0, 1),
    getIndexByRowCol(0, 2),
    getIndexByRowCol(1, 0),
    getIndexByRowCol(1, 1),
    getIndexByRowCol(1, 2),
    getIndexByRowCol(2, 0),
    getIndexByRowCol(2, 1),
    getIndexByRowCol(2, 2)
  ]
  // the following array represents all indices of top left corners of the nine
  // 3x3 squares in the sudoku grid
  const squareIdxsTopLeftOnly = [
    getIndexByRowCol(0, 0),
    getIndexByRowCol(0, 3),
    getIndexByRowCol(0, 6),
    getIndexByRowCol(3, 0),
    getIndexByRowCol(3, 3),
    getIndexByRowCol(3, 6),
    getIndexByRowCol(6, 0),
    getIndexByRowCol(6, 3),
    getIndexByRowCol(6, 6)
  ]

  // accumulate invalid indices to return at the end of the function using a
  // set to guard against duplicate indices
  const invalidIdxs = new Set()

  for (let topLeft of squareIdxsTopLeftOnly) {
    const idxsThisSquare = {}
    for (let delta of squareIdxDelta) {
      const nextIdx = topLeft + delta
      const next = sudokuStr[nextIdx]
      if (next === '.') {
        continue
      }
      if (idxsThisSquare.hasOwnProperty(next)) {
        idxsThisSquare[next].push(nextIdx)
        for (const idx of idxsThisSquare[next]) {
          invalidIdxs.add(idx)
        }
        continue
      }
      idxsThisSquare[next] = [nextIdx]
    }
  }

  return invalidIdxs
}

const forExport = {
  getIndexByRowCol,
  getRowColByIndex,
  getValueByRowCol,
  getInvalidIdxsBySquaresRule
}

module.exports = forExport
