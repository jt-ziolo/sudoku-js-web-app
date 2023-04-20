const assert = require('chai').assert
const {
  getValueByRowCol,
  getIdxByRowCol,
  getRowColByIdx,
} = require('../src/index.js')
const {
  filledSudoku,
  unfilledSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort
} = require('./test-constants.js')

describe('sudoku utility functions', () => {
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
