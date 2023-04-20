const getValueByRowCol = (sudokuStr, row, col) => {
  // row, col, idx
  // 0, 0, 0
  // 0, 1, 1
  // 1, 0, 9
  // 1, 1, 10
  // 1, 8, 17
  // x, y, x*9+y
  if (!isCorrectlyFormattedSudokuStr(sudokuStr)) {
    throw Error('Illegally formatted sudoku string')
  }

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

const getInvalidIdxsByRowsRule = sudokuStr => {
  if (!isCorrectlyFormattedSudokuStr(sudokuStr)) {
    throw Error('Illegally formatted sudoku string')
  }
  // the following array represents all delta values which, when added to the
  // index of the leftmost square in a row of the sudoku grid, will yield all
  // 9 squares within the row
  const squareIdxDelta = [
    getIndexByRowCol(0, 0),
    getIndexByRowCol(0, 1),
    getIndexByRowCol(0, 2),
    getIndexByRowCol(0, 3),
    getIndexByRowCol(0, 4),
    getIndexByRowCol(0, 5),
    getIndexByRowCol(0, 6),
    getIndexByRowCol(0, 7),
    getIndexByRowCol(0, 8)
  ]
  // the following array represents all indices of squares in the leftmost
  // column of the nine rows in the sudoku grid
  const squareIdxsLeftOnly = [
    getIndexByRowCol(0, 0),
    getIndexByRowCol(1, 0),
    getIndexByRowCol(2, 0),
    getIndexByRowCol(3, 0),
    getIndexByRowCol(4, 0),
    getIndexByRowCol(5, 0),
    getIndexByRowCol(6, 0),
    getIndexByRowCol(7, 0),
    getIndexByRowCol(8, 0)
  ]

  // accumulate invalid indices to return at the end of the function using a
  // set to guard against duplicate indices
  const invalidIdxs = new Set()

  for (let start of squareIdxsLeftOnly) {
    const idxsThisRow = {}
    for (let delta of squareIdxDelta) {
      const nextIdx = start + delta
      const next = sudokuStr[nextIdx]
      if (next === '.') {
        continue
      }
      if (idxsThisRow.hasOwnProperty(next)) {
        idxsThisRow[next].push(nextIdx)
        for (const idx of idxsThisRow[next]) {
          invalidIdxs.add(idx)
        }
        continue
      }
      idxsThisRow[next] = [nextIdx]
    }
  }

  return invalidIdxs
}

const getInvalidIdxsByColsRule = sudokuStr => {
  if (!isCorrectlyFormattedSudokuStr(sudokuStr)) {
    throw Error('Illegally formatted sudoku string')
  }
  // the following array represents all delta values which, when added to the
  // index of the topmost square in a column of the sudoku grid, will yield all
  // 9 squares within the column
  const squareIdxDelta = [
    getIndexByRowCol(0, 0),
    getIndexByRowCol(1, 0),
    getIndexByRowCol(2, 0),
    getIndexByRowCol(3, 0),
    getIndexByRowCol(4, 0),
    getIndexByRowCol(5, 0),
    getIndexByRowCol(6, 0),
    getIndexByRowCol(7, 0),
    getIndexByRowCol(8, 0)
  ]
  // the following array represents all indices of squares in the topmost
  // row of the nine columns in the sudoku grid
  const squareIdxsTopOnly = [
    getIndexByRowCol(0, 0),
    getIndexByRowCol(0, 1),
    getIndexByRowCol(0, 2),
    getIndexByRowCol(0, 3),
    getIndexByRowCol(0, 4),
    getIndexByRowCol(0, 5),
    getIndexByRowCol(0, 6),
    getIndexByRowCol(0, 7),
    getIndexByRowCol(0, 8)
  ]

  // accumulate invalid indices to return at the end of the function using a
  // set to guard against duplicate indices
  const invalidIdxs = new Set()

  for (let start of squareIdxsTopOnly) {
    const idxsThisColumn = {}
    for (let delta of squareIdxDelta) {
      const nextIdx = start + delta
      const next = sudokuStr[nextIdx]
      if (next === '.') {
        continue
      }
      if (idxsThisColumn.hasOwnProperty(next)) {
        idxsThisColumn[next].push(nextIdx)
        for (const idx of idxsThisColumn[next]) {
          invalidIdxs.add(idx)
        }
        continue
      }
      idxsThisColumn[next] = [nextIdx]
    }
  }

  return invalidIdxs
}

const getInvalidIdxsBySquaresRule = sudokuStr => {
  if (!isCorrectlyFormattedSudokuStr(sudokuStr)) {
    throw Error('Illegally formatted sudoku string')
  }
  // the following array represents all delta values which, when added to the
  // index of the top left corner of a 3x3 square in the sudoku grid, will
  // yield all 9 squares within the 3x3 square
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

// Correctly formatted sudoku strings are 81 characters long and only contain
// numeric digits 1-9 and '.'
const isCorrectlyFormattedSudokuStr = sudokuStr => {
  if (sudokuStr.length !== 81) {
    return false
  }
  const validChars = '123456789.'
  for (let nextChar of sudokuStr) {
    if (!validChars.includes(nextChar)) {
      return false
    }
  }
  return true
}

const getEmptyIdxs = sudokuStr => {
  if (!isCorrectlyFormattedSudokuStr(sudokuStr)) {
    throw Error('Illegally formatted sudoku string')
  }
  const result = new Set()
  for (let i = 0; i < sudokuStr.length; i++) {
    const nextChar = sudokuStr[i]
    if (nextChar == '.') {
      result.add(i)
    }
  }
  return result
}

const isFilled = sudokuStr => {
  const emptyIdxs = getEmptyIdxs(sudokuStr)
  return emptyIdxs.size == 0
}

const isValid = sudokuStr => {
}

const forExport = {
  getIndexByRowCol,
  getRowColByIndex,
  getValueByRowCol,
  getEmptyIdxs,
  isFilled,
  isValid,
  getInvalidIdxsByRowsRule,
  getInvalidIdxsByColsRule,
  getInvalidIdxsBySquaresRule
}

module.exports = forExport
