import { random, XORShift } from '../node_modules/random-seedable/src/index.js'
import sudokuGenLib from '../node_modules/sudoku.utils/build/sudoku.esm.js'
const sudokuSolveLib = sudokuGenLib

class SudokuSquareNode {
  constructor (idx, domElement) {
    this.idx = idx
    this.domElement = domElement // TODO: consider removing .domElement
    this._isFilled = false
    this._highlightType = 'none'
  }
  updateClasses () {
    this.domElement.className = `highlight-${this._highlightType}`
  }
  clearHighlights () {
    this._highlightType = 'none'
    this.updateClasses()
  }
  setHighlightSelected () {
    throw Error('not implemented')
  }
  setHighlightHoverOrFocused () {
    this._highlightType = 'hover'
    this.updateClasses()
  }
  setHighlightError () {
    throw Error('not implemented')
  }
  setValue (number) {
    this.clearPencilMarks()
    this._isFilled = true
    this.updateClasses()
    throw Error('not implemented')
  }
  clearValue () {
    this._isFilled = false
    this.updateClasses()
    throw Error('not implemented')
  }
  togglePencilMark (number) {
    throw Error('not implemented')
  }
  clearPencilMarks () {
    throw Error('not implemented')
  }
}

class SudokuGrid {
  constructor (doc) {
    this._values = []
    this._values.length = 81

    const gridDiv = doc.getElementById('sudoku')
    const templateBigSquare = doc.getElementById('template-big-square')
    templateBigSquare.removeAttribute('id')
    const templateSquare = doc.getElementById('template-square')
    templateSquare.removeAttribute('id')

    // the following array represents all delta values which, when added to the
    // index of the top left corner of a 3x3 square in the sudoku grid, will
    // yield all 9 squares within the 3x3 square
    // TODO: candidate for refactor due to repetition
    const squareIdxDelta = [
      getIdxByRowCol(0, 0),
      getIdxByRowCol(0, 1),
      getIdxByRowCol(0, 2),
      getIdxByRowCol(1, 0),
      getIdxByRowCol(1, 1),
      getIdxByRowCol(1, 2),
      getIdxByRowCol(2, 0),
      getIdxByRowCol(2, 1),
      getIdxByRowCol(2, 2)
    ]
    // the following array represents all indices of top left corners of the nine
    // 3x3 squares in the sudoku grid
    const squareIdxsTopLeftOnly = [
      getIdxByRowCol(0, 0),
      getIdxByRowCol(0, 3),
      getIdxByRowCol(0, 6),
      getIdxByRowCol(3, 0),
      getIdxByRowCol(3, 3),
      getIdxByRowCol(3, 6),
      getIdxByRowCol(6, 0),
      getIdxByRowCol(6, 3),
      getIdxByRowCol(6, 6)
    ]

    for (let i = 0; i < 9; i++) {
      const nextBigSquare = templateBigSquare.cloneNode(true)
      const topLeftIdx = squareIdxsTopLeftOnly[i]
      for (let j = 0; j < 9; j++) {
        const nextSquare = templateSquare.cloneNode(true)
        nextBigSquare.appendChild(nextSquare)
        const nextIdx = topLeftIdx + squareIdxDelta[j]
        this.setupSquareEvents(nextSquare, nextIdx)
        const nextNode = new SudokuSquareNode(nextIdx, nextSquare)
        this._values[nextIdx] = nextNode
      }
      gridDiv.appendChild(nextBigSquare)
    }
    templateBigSquare.remove()
    templateSquare.remove()
  }
  setupSquareEvents (domElement, idx) {
    domElement.addEventListener('mouseenter', _ => {
      this.onMouseEnter(idx)
    })
    domElement.addEventListener('mouseleave', _ => {
      this.onMouseLeave(idx)
    })
    // TODO: does not seem to be supported
    // domElement.addEventListener('keydown', event => {
    // this.onKeyDown(idx, event.key, event.shiftKey)
    // })
  }
  onMouseEnter (idx) {
    this.getNodeByIdx(idx).setHighlightHoverOrFocused()
    // console.log(`onMouseEnter ${idx}`)
  }
  onMouseLeave (idx) {
    this.getNodeByIdx(idx).clearHighlights()
    // console.log(`onMouseLeave ${idx}`)
  }
  onKeyDown (idx, key, isShiftKeyDown) {
    console.log(`onKeyDown ${idx} ${key} ${isShiftKeyDown}`)
  }
  getNodeByIdx (idx) {
    return this._values[idx]
  }
}

const setValueByRowCol = (sudokuStr, row, col, setTo) => {
  validateSudokuStr(sudokuStr)

  const targetIdx = getIdxByRowCol(row, col)

  let result = ''
  for (let i = 0; i < sudokuStr.length; i++) {
    if (i == targetIdx) {
      result += setTo
      continue
    }
    result += sudokuStr[i]
  }

  validateSudokuStr(result)

  return result
}

const getValueByRowCol = (sudokuStr, row, col) => {
  // row, col, idx
  // 0, 0, 0
  // 0, 1, 1
  // 1, 0, 9
  // 1, 1, 10
  // 1, 8, 17
  // x, y, x*9+y

  validateSudokuStr(sudokuStr)

  if (0 > row || 9 <= row) {
    throw RangeError('Row must be >= 0 and < 9')
  }
  if (0 > col || 9 <= col) {
    throw RangeError('Col must be >= 0 and < 9')
  }
  const idx = getIdxByRowCol(row, col)
  return sudokuStr[idx]
}

const getIdxByRowCol = (row, col) => {
  return row * 9 + col
}

const getRowColByIdx = idx => {
  return [Math.trunc(idx / 9), idx % 9]
}

const getInvalidIdxsByRowsRule = sudokuStr => {
  validateSudokuStr(sudokuStr)

  // the following array represents all delta values which, when added to the
  // index of the leftmost square in a row of the sudoku grid, will yield all
  // 9 squares within the row
  const squareIdxDelta = [
    getIdxByRowCol(0, 0),
    getIdxByRowCol(0, 1),
    getIdxByRowCol(0, 2),
    getIdxByRowCol(0, 3),
    getIdxByRowCol(0, 4),
    getIdxByRowCol(0, 5),
    getIdxByRowCol(0, 6),
    getIdxByRowCol(0, 7),
    getIdxByRowCol(0, 8)
  ]
  // the following array represents all indices of squares in the leftmost
  // column of the nine rows in the sudoku grid
  const squareIdxsLeftOnly = [
    getIdxByRowCol(0, 0),
    getIdxByRowCol(1, 0),
    getIdxByRowCol(2, 0),
    getIdxByRowCol(3, 0),
    getIdxByRowCol(4, 0),
    getIdxByRowCol(5, 0),
    getIdxByRowCol(6, 0),
    getIdxByRowCol(7, 0),
    getIdxByRowCol(8, 0)
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
  validateSudokuStr(sudokuStr)

  // the following array represents all delta values which, when added to the
  // index of the topmost square in a column of the sudoku grid, will yield all
  // 9 squares within the column
  const squareIdxDelta = [
    getIdxByRowCol(0, 0),
    getIdxByRowCol(1, 0),
    getIdxByRowCol(2, 0),
    getIdxByRowCol(3, 0),
    getIdxByRowCol(4, 0),
    getIdxByRowCol(5, 0),
    getIdxByRowCol(6, 0),
    getIdxByRowCol(7, 0),
    getIdxByRowCol(8, 0)
  ]
  // the following array represents all indices of squares in the topmost
  // row of the nine columns in the sudoku grid
  const squareIdxsTopOnly = [
    getIdxByRowCol(0, 0),
    getIdxByRowCol(0, 1),
    getIdxByRowCol(0, 2),
    getIdxByRowCol(0, 3),
    getIdxByRowCol(0, 4),
    getIdxByRowCol(0, 5),
    getIdxByRowCol(0, 6),
    getIdxByRowCol(0, 7),
    getIdxByRowCol(0, 8)
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
  validateSudokuStr(sudokuStr)

  // the following array represents all delta values which, when added to the
  // index of the top left corner of a 3x3 square in the sudoku grid, will
  // yield all 9 squares within the 3x3 square
  const squareIdxDelta = [
    getIdxByRowCol(0, 0),
    getIdxByRowCol(0, 1),
    getIdxByRowCol(0, 2),
    getIdxByRowCol(1, 0),
    getIdxByRowCol(1, 1),
    getIdxByRowCol(1, 2),
    getIdxByRowCol(2, 0),
    getIdxByRowCol(2, 1),
    getIdxByRowCol(2, 2)
  ]
  // the following array represents all indices of top left corners of the nine
  // 3x3 squares in the sudoku grid
  const squareIdxsTopLeftOnly = [
    getIdxByRowCol(0, 0),
    getIdxByRowCol(0, 3),
    getIdxByRowCol(0, 6),
    getIdxByRowCol(3, 0),
    getIdxByRowCol(3, 3),
    getIdxByRowCol(3, 6),
    getIdxByRowCol(6, 0),
    getIdxByRowCol(6, 3),
    getIdxByRowCol(6, 6)
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
const validateSudokuStr = sudokuStr => {
  if (sudokuStr.length !== 81) {
    throw Error(
      `Illegally formatted sudoku string, length is ${sudokuStr.length}, !== 81`
    )
  }
  const validChars = '123456789.'
  for (let nextChar of sudokuStr) {
    if (!validChars.includes(nextChar)) {
      throw Error(
        `Illegally formatted sudoku string, bad character ${nextChar}`
      )
    }
  }
}

const getEmptyIdxs = sudokuStr => {
  validateSudokuStr(sudokuStr)

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
  validateSudokuStr(sudokuStr)

  const emptyIdxs = getEmptyIdxs(sudokuStr)
  return emptyIdxs.size == 0
}

const isValid = sudokuStr => {
  validateSudokuStr(sudokuStr)

  if (getInvalidIdxsByColsRule(sudokuStr).size != 0) {
    return false
  }
  if (getInvalidIdxsByRowsRule(sudokuStr).size != 0) {
    return false
  }
  if (getInvalidIdxsBySquaresRule(sudokuStr).size != 0) {
    return false
  }
  return true
}

const isSolved = sudokuStr => {
  return isValid(sudokuStr) && isFilled(sudokuStr)
}

class SudokuGenLibAdapter {
  constructor (randomSeed) {
    if (randomSeed) {
      this.rng = new XORShift(randomSeed)
    } else {
      this.rng = random
    }
    this.seed = randomSeed
  }
  generate (nGivens) {
    nGivens = nGivens || 50
    const result = sudokuGenLib.generate(nGivens, this.rng)
    validateSudokuStr(result)
    return result
  }
  reset () {
    return new SudokuGenLibAdapter(this.seed)
  }
}

class SudokuSolveLibAdapter {
  solve (sudokuStr) {
    return sudokuSolveLib.solve(sudokuStr)
  }
}

export {
  getIdxByRowCol,
  getRowColByIdx,
  getValueByRowCol,
  setValueByRowCol,
  getEmptyIdxs,
  isFilled,
  isValid,
  isSolved,
  getInvalidIdxsByRowsRule,
  getInvalidIdxsByColsRule,
  getInvalidIdxsBySquaresRule,
  validateSudokuStr,
  SudokuGrid,
  SudokuSquareNode,
  SudokuSolveLibAdapter,
  SudokuGenLibAdapter
}

// Site setup
// TODO: move to a separate file and update index.html reference
const grid = new SudokuGrid(document)
