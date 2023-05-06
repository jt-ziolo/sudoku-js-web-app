// import { random, XORShift } from '../node_modules/random-seedable/src/index.js'
// import sudokuGenLib from '../node_modules/sudoku.utils/build/sudoku.esm.js'
import { random, XORShift } from 'random-seedable'
import { default as sudokuGenLib } from 'sudoku.utils'
const sudokuSolveLib = sudokuGenLib

class ProhibitedOverwriteError extends Error {}

class SudokuSquareNode {
  constructor (idx, domElement) {
    this.idx = idx
    this.domElement = domElement
    this._valueDomElement = domElement.getElementsByTagName('strong')[0]
    this._pencilmarkDomElements =
      domElement.getElementsByClassName('pencilmarks')[0].children
    this._activePencilmarks = new Set()

    this._isVisible = false
    this._isError = false
    this._isGiven = false
    this._isSelected = false
    this._highlightType = 'none'
  }
  updateView () {
    // update domElement css class name controlling background color
    if (
      (this._isSelected && this._highlightType === 'hover') ||
      this._highlightType === 'hover-selected'
    ) {
      this._highlightType = 'hover-selected'
    } else if (this._isSelected) {
      this._highlightType = 'selected'
    }
    this.domElement.className = `highlight-${this._highlightType}`

    // update _valueDomElement css class names controlling visibility
    let valueClassName = 'hidden'

    if (this._isVisible) {
      valueClassName = 'visible'
      if (this._isError) {
        valueClassName = 'visible error'
      } else if (this._isGiven) {
        valueClassName = 'visible given'
      }
    }

    this._valueDomElement.className = valueClassName
    // update _pencilmarkDomElements class names
    // start by setting all pencilmarks to hidden, then unhiding those which
    // are active
    for (const next of this._pencilmarkDomElements) {
      next.className = 'hidden'
    }
    if (this._isVisible) {
      // don't render pencilmarks if the square is filled
      return
    }
    for (const nextActive of this._activePencilmarks) {
      // unhide the pencilmark element with innerHTML matching the number
      const nextElement = this._pencilmarkDomElements[nextActive - 1]
      nextElement.className = 'visible'
    }
  }
  clearHighlights () {
    this._highlightType = 'none'
    this.updateView()
  }
  setSelected (isSelected) {
    this._isSelected = isSelected
    if (this._isSelected) {
      this.updateView()
      return
    }
    if (this._highlightType === 'hover-selected') {
      this.updateView()
    } else {
      this.clearHighlights()
    }
  }
  setHighlightHoverOrFocused () {
    this._highlightType = 'hover'
    this.updateView()
  }
  setTextColorError (isError = true) {
    this._isError = isError
    this.updateView()
  }
  clearTextColorError () {
    this.setTextColorError(false)
  }
  setTextColorGiven (isGiven = true) {
    this._isGiven = isGiven
    this.updateView()
  }
  clearTextColorGiven () {
    this.setTextColorGiven(false)
  }
  setValue (number, isOverridingGiven = false) {
    if (!isOverridingGiven && this._isGiven) {
      throw new ProhibitedOverwriteError('Attempted to overwrite given')
    }
    if (number === '.') {
      this._isVisible = false
      this.updateView()
      return
    }
    // this.clearPencilMarks()
    this._isVisible = true
    this.setTextColorGiven(isOverridingGiven)
    this._valueDomElement.innerHTML = number
    this.updateView()
  }
  togglePencilMark (number) {
    console.log(number)
    if (number <= 0 || number > 9) {
      return
    }
    if (this._activePencilmarks.has(number)) {
      this._activePencilmarks.delete(number)
      this.updateView()
      return
    }
    this._activePencilmarks.add(number)
    this.updateView()
  }
  clearPencilMarks () {
    this._activePencilmarks = new Set()
    this.updateView()
  }
}

class SudokuGrid {
  constructor (doc) {
    this._nodes = []
    this._nodes.length = 81
    this._selectedIdx = -1
    this._sudokuStr =
      '.................................................................................'

    this._isInputEnabled = true

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
        this._nodes[nextIdx] = nextNode
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
    domElement.addEventListener('click', _ => {
      this.onClick(idx)
    })
    domElement.addEventListener('keydown', event => {
      this.onKeyDown(idx, event.key, event.ctrlKey)
    })
  }
  onMouseEnter (idx) {
    this.getNodeByIdx(idx).setHighlightHoverOrFocused()
  }
  onMouseLeave (idx) {
    this.getNodeByIdx(idx).clearHighlights()
  }
  onClick (idx) {
    if (this._selectedIdx !== -1) {
      this.getNodeByIdx(this._selectedIdx).setSelected(false)
    }
    this.getNodeByIdx(idx).setSelected(true)
    this._selectedIdx = idx
  }
  onKeyDown (key, isCtrlKeyDown) {
    if (!this._isInputEnabled) {
      return
    }
    this._isInputEnabled = false
    switch (key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this._onNumberKeyDown(key, isCtrlKeyDown)
        break

      case 'Backspace':
      case 'Delete':
        this._onDeleteKeyDown()
        break

      case 'ArrowLeft':
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
        this._onArrowKeyDown(key)
        break

      default:
        break
    }
    this._isInputEnabled = true
  }
  _onNumberKeyDown (key, isCtrlKeyDown) {
    if (this._selectedIdx === -1) {
      return
    }
    const node = this.getNodeByIdx(this._selectedIdx)
    if (isCtrlKeyDown) {
      node.togglePencilMark(key)
      return
    }
    try {
      node.setValue(key)
      this._sudokuStr = setValueByIdx(this._sudokuStr, this._selectedIdx, key)
    } catch (e) {
      if (!(e instanceof ProhibitedOverwriteError)) {
        throw e
      }
    }
    this._onSudokuStrUpdated()
  }
  _onDeleteKeyDown () {
    if (this._selectedIdx === -1) {
      return
    }
    this.getNodeByIdx(this._selectedIdx).setValue('.')
    this._sudokuStr = setValueByIdx(this._sudokuStr, this._selectedIdx, '.')
    this._onSudokuStrUpdated()
  }
  _onArrowKeyDown (key) {
    if (this._selectedIdx === -1) {
      // select the first square if none is selected
      this.onClick(getIdxByRowCol(0, 0))
      return
    }
    let [row, col] = getRowColByIdx(this._selectedIdx)
    switch (key) {
      case 'ArrowLeft':
        if (col == 0) {
          col = 8
        } else {
          col -= 1
        }
        break
      case 'ArrowUp':
        if (row == 0) {
          row = 8
        } else {
          row -= 1
        }
        break
      case 'ArrowRight':
        if (col == 8) {
          col = 0
        } else {
          col += 1
        }
        break
      case 'ArrowDown':
        if (row == 8) {
          row = 0
        } else {
          row += 1
        }
        break
      default:
        break
    }
    this.onClick(getIdxByRowCol(row, col))
  }
  _onSudokuStrUpdated () {
    const sudokuStr = this._sudokuStr
    // check if the sudoku is solved
    if (isSolved(sudokuStr)) {
      this._isInputEnabled = false
      alert('Congratulations, you solved the sudoku!')
    }
    // reset the text color of all squares
    for (const node of this._nodes) {
      node.clearTextColorError()
    }

    // check for invalid squares
    const invalidIdxs = getInvalidIdxsAll(sudokuStr)
    if (invalidIdxs.size === 0) {
      return
    }
    // set the text color of invalid squares to red
    for (const idx of invalidIdxs) {
      this.getNodeByIdx(idx).setTextColorError()
    }
  }
  getNodeByIdx (idx) {
    return this._nodes[idx]
  }
  populateWithSudokuStr (sudokuStr) {
    validateSudokuStr(sudokuStr)
    this._sudokuStr = sudokuStr
    this._nodes.forEach(node => {
      node.clearHighlights()
      node.clearPencilMarks()
      node.clearTextColorError()
      node.clearTextColorGiven()
    })
    for (const idx in this._sudokuStr) {
      const nextNode = this.getNodeByIdx(idx)
      nextNode.setValue(this._sudokuStr[idx], true)
    }
  }
}

const setValueByIdx = (sudokuStr, idx, setTo) => {
  validateSudokuStr(sudokuStr)

  let result = ''
  for (let i = 0; i < sudokuStr.length; i++) {
    if (i == idx) {
      result += setTo
      continue
    }
    result += sudokuStr[i]
  }

  validateSudokuStr(result)

  return result
}

const setValueByRowCol = (sudokuStr, row, col, setTo) => {
  return setValueByIdx(sudokuStr, getIdxByRowCol(row, col), setTo)
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

const getInvalidIdxsAll = sudokuStr => {
  const result = new Set()

  const rowsRuleIdxs = getInvalidIdxsByColsRule(sudokuStr)
  for (const elem of rowsRuleIdxs) {
    result.add(elem)
  }
  const colsRuleIdxs = getInvalidIdxsByRowsRule(sudokuStr)
  for (const elem of colsRuleIdxs) {
    result.add(elem)
  }
  const squaresRuleIdxs = getInvalidIdxsBySquaresRule(sudokuStr)
  for (const elem of squaresRuleIdxs) {
    result.add(elem)
  }

  return result
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
    this._seed = randomSeed
  }
  generate (nGivens) {
    nGivens = nGivens || 50
    // The type of nGivens must be Number for this to work correctly
    const result = sudokuGenLib.generate(parseInt(nGivens), this.rng)
    validateSudokuStr(result)
    return result
  }
  reset () {
    return new SudokuGenLibAdapter(this._seed)
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
try {
  const grid = new SudokuGrid(document)

  // set up keyboard events
  document.onkeydown = event => {
    if (
      ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)
    ) {
      event.preventDefault()
    }
    grid.onKeyDown(event.key, event.ctrlKey)
  }

  // Generate the initial sudoku
  // TODO: add fixed seed depending on if we are using a test adapter for the
  // browser
  const generator = new SudokuGenLibAdapter()
  let nGivens = 62
  grid.populateWithSudokuStr(generator.generate(nGivens))

  // link the range input to its label
  const output = document.getElementById('difficulty-output')
  const input = document.getElementById('difficulty-range')
  input.addEventListener('input', event => {
    output.textContent = event.target.value
    nGivens = event.target.value
  })
  output.textContent = input.value
  nGivens = input.value

  // link the generate button with sudoku generation
  document.getElementById('generate-btn').addEventListener('click', event => {
    const result = generator.generate(nGivens)
    grid.populateWithSudokuStr(result)
  })
} catch (e) {}
