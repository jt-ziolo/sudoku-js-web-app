const assert = require('chai').assert
const {
  getValueByRowCol,
  setValueByRowCol,
  getIdxByRowCol,
  getRowColByIdx
} = require('../src/index.js')
const {
  filledSudoku,
  unfilledSudoku,
  partiallySolvedSudoku,
  blankSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort
} = require('./test-constants.js')

describe('sudoku utility functions', () => {
  describe('setValueByRowCol', () => {
    it('successfully sets the value at (0, 0) of a blank sudoku', () => {
      // setup
      const input = blankSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 0, 0, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 0, 0), expected)
    })
    it('successfully sets the value at (3, 4) of a blank sudoku', () => {
      // setup
      const input = blankSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 3, 4, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 3, 4), expected)
    })
    it('successfully sets the value at (8, 8) of a blank sudoku', () => {
      // setup
      const input = blankSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 8, 8, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 8, 8), expected)
    })
    it('successfully sets the value at (0, 0) of a filled sudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 0, 0, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 0, 0), expected)
    })
    it('successfully sets the value at (3, 4) of a filled sudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 3, 4, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 3, 4), expected)
    })
    it('successfully sets the value at (8, 8) of a filled sudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 8, 8, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 8, 8), expected)
    })
    it('successfully sets the value at (0, 0) of a partially filled sudoku', () => {
      // setup
      const input = partiallySolvedSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 0, 0, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 0, 0), expected)
    })
    it('successfully sets the value at (3, 4) of a partially filled sudoku', () => {
      // setup
      const input = partiallySolvedSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 3, 4, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 3, 4), expected)
    })
    it('successfully sets the value at (8, 8) of a partially filled sudoku', () => {
      // setup
      const input = partiallySolvedSudoku
      const expected = 2
      // exercise
      const result = setValueByRowCol(input, 8, 8, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 8, 8), expected)
    })
    it('results in no change when setting a value to the existing value (for a blank sudoku)', () => {
      // setup
      const input = blankSudoku
      const expected = getValueByRowCol(input, 2, 2)
      // exercise
      const result = setValueByRowCol(input, 2, 2, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 2, 2), expected)
      assert.strictEqual(result, input)
    })
    it('results in no change when setting a value to the existing value (for a filled sudoku)', () => {
      // setup
      const input = filledSudoku
      const expected = getValueByRowCol(input, 2, 2)
      // exercise
      const result = setValueByRowCol(input, 2, 2, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 2, 2), expected)
      assert.strictEqual(result, input)
    })
    it('results in no change when setting a value to the existing value (for a partially filled sudoku)', () => {
      // setup
      const input = partiallySolvedSudoku
      const expected = getValueByRowCol(input, 2, 2)
      // exercise
      const result = setValueByRowCol(input, 2, 2, expected)
      // verify
      assert.strictEqual(getValueByRowCol(result, 2, 2), expected)
      assert.strictEqual(result, input)
    })
    it('throws a RangeError when attempting to set the value to an illegal value', () => {
      // setup
      const input = partiallySolvedSudoku
      const examples = ['a', 'b', 'C', '>', 0, '!', ' ']
      // exercise & verify
      for (let next of examples) {
        assert.throws(() => {
          setValueByRowCol(input, 0, 0, next)
        }, RangeError)
      }
    })
  })
  describe('getRowColByIdx', () => {
    it('is the inverse of getIdxByRowCol, returns original input', () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          let idx = getIdxByRowCol(row, col)
          let [resultRow, resultCol] = getRowColByIdx(idx)
          assert.strictEqual(resultRow, row)
          assert.strictEqual(resultCol, col)
        }
      }
    })
  })
  describe('getValueByRowCol and getIdxByRowCol', () => {
    it('returns the correct value for (0, 0) on unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = '.'
      // exercise
      const result = getValueByRowCol(input, 0, 0)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (0, 0) on filledSudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 1
      // exercise
      const result = getValueByRowCol(input, 0, 0)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (8, 0) on unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = 9
      // exercise
      const result = getValueByRowCol(input, 8, 0)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (4, 3) on unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = '.'
      // exercise
      const result = getValueByRowCol(input, 4, 3)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (4, 3) on filledSudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 8
      // exercise
      const result = getValueByRowCol(input, 4, 3)
      // verify
      assert.equal(result, expected)
    })
    it('throws RangeError for (-1, *)', () => {
      // setup
      const input = unfilledSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, -1, i), RangeError)
      }
    })
    it('throws RangeError for (*, -1)', () => {
      // setup
      const input = unfilledSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, i, -1), RangeError)
      }
    })
    it('throws RangeError for (-1, -1)', () => {
      // setup
      const input = unfilledSudoku // does not matter which
      // exercise and verify
      assert.throws(() => getValueByRowCol(input, -1, -1), RangeError)
    })
    it('throws RangeError for (9, *)', () => {
      // setup
      const input = unfilledSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, 9, i), RangeError)
      }
    })
    it('throws RangeError for (*, 9)', () => {
      // setup
      const input = unfilledSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, i, 9), RangeError)
      }
    })
    it('throws RangeError for (9, 9)', () => {
      // setup
      const input = unfilledSudoku // does not matter which
      // exercise and verify
      assert.throws(() => getValueByRowCol(input, 9, 9), RangeError)
    })
  })
})
