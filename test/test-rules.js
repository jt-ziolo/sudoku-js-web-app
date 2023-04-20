const assert = require('chai').assert
const {
  getInvalidIdxsBySquaresRule,
  getInvalidIdxsByRowsRule,
  getInvalidIdxsByColsRule,
} = require('../src/index.js')
const {
  validSudoku,
  invalidSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort
} = require('./test-constants.js')
const { isSuperSet } = require('./test-helpers.js')

describe('invalid indices for each rule', () => {
  describe('getInvalidIdxsByRowsRule', () => {
    it('includes all invalid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const expected = new Set([12, 16, 36, 38, 37, 39, 54, 59, 73, 76])
      // exercise
      const result = getInvalidIdxsByRowsRule(input)
      // verify
      assert.isTrue(
        isSuperSet(result, expected),
        'lacks one or more of the expected invalid indices'
      )
    })
    it('does not include valid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const invalidIndices = new Set([12, 16, 36, 38, 37, 39, 54, 59, 73, 76])

      const validIndices = new Set()
      for (let i = 0; i < 81; i++) {
        if (invalidIndices.has(i)) {
          continue
        }
        validIndices.add(i)
      }
      // exercise
      const result = getInvalidIdxsByRowsRule(input)
      // verify
      for (const next of result) {
        assert.isFalse(
          validIndices.has(next),
          'contains one or more valid indices'
        )
      }
    })
    it('does not find invalid indices in validSudoku', () => {
      // setup
      const input = validSudoku
      // exercise
      const result = getInvalidIdxsByRowsRule(input)
      // verify
      assert.isTrue(result.size === 0, 'contains one or more valid indices')
    })
    it('throws an error when provided with an invalid sudoku string (too short)', () => {
      const input = illegalSudokuStrTooShort
      assert.throws(
        () => getInvalidIdxsByRowsRule(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (too long)', () => {
      const input = illegalSudokuStrTooLong
      assert.throws(
        () => getInvalidIdxsByRowsRule(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (illegal digits)', () => {
      const input = illegalSudokuStrDigits
      assert.throws(
        () => getInvalidIdxsByRowsRule(input),
        /Illegally formatted sudoku string/
      )
    })
  })
  describe('getInvalidIdxsByColsRule', () => {
    it('includes all invalid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const expected = new Set([13, 31, 49, 76, 5, 23, 6, 69, 16, 61])
      // exercise
      const result = getInvalidIdxsByColsRule(input)
      // verify
      assert.isTrue(
        isSuperSet(result, expected),
        'lacks one or more of the expected invalid indices'
      )
    })
    it('does not include valid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const invalidIndices = new Set([13, 31, 49, 76, 5, 23, 6, 69, 16, 61])

      const validIndices = new Set()
      for (let i = 0; i < 81; i++) {
        if (invalidIndices.has(i)) {
          continue
        }
        validIndices.add(i)
      }
      // exercise
      const result = getInvalidIdxsByColsRule(input)
      // verify
      for (const next of result) {
        assert.isFalse(
          validIndices.has(next),
          'contains one or more valid indices'
        )
      }
    })
    it('does not find invalid indices in validSudoku', () => {
      // setup
      const input = validSudoku
      // exercise
      const result = getInvalidIdxsByColsRule(input)
      // verify
      assert.isTrue(result.size === 0, 'contains one or more valid indices')
    })
    it('throws an error when provided with an invalid sudoku string (too short)', () => {
      const input = illegalSudokuStrTooShort
      assert.throws(
        () => getInvalidIdxsByColsRule(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (too long)', () => {
      const input = illegalSudokuStrTooLong
      assert.throws(
        () => getInvalidIdxsByColsRule(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (illegal digits)', () => {
      const input = illegalSudokuStrDigits
      assert.throws(
        () => getInvalidIdxsByColsRule(input),
        /Illegally formatted sudoku string/
      )
    })
  })
  describe('getInvalidIdxsBySquaresRule', () => {
    it('includes all invalid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const expected = new Set([0, 20, 5, 23, 36, 38, 31, 39, 35, 52, 66, 76])
      // exercise
      const result = getInvalidIdxsBySquaresRule(input)
      // verify
      assert.isTrue(
        isSuperSet(result, expected),
        'lacks one or more of the expected invalid indices'
      )
    })
    it('does not include valid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const invalidIndices = new Set([
        0, 20, 5, 23, 36, 38, 31, 39, 35, 52, 66, 76
      ])

      const validIndices = new Set()
      for (let i = 0; i < 81; i++) {
        if (invalidIndices.has(i)) {
          continue
        }
        validIndices.add(i)
      }
      // exercise
      const result = getInvalidIdxsBySquaresRule(input)
      // verify
      for (const next of result) {
        assert.isFalse(
          validIndices.has(next),
          'contains one or more valid indices'
        )
      }
    })
    it('does not find invalid indices in validSudoku', () => {
      // setup
      const input = validSudoku
      // exercise
      const result = getInvalidIdxsBySquaresRule(input)
      // verify
      assert.isTrue(result.size === 0, 'contains one or more valid indices')
    })
    it('throws an error when provided with an invalid sudoku string (too short)', () => {
      const input = illegalSudokuStrTooShort
      assert.throws(
        () => getInvalidIdxsBySquaresRule(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (too long)', () => {
      const input = illegalSudokuStrTooLong
      assert.throws(
        () => getInvalidIdxsBySquaresRule(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (illegal digits)', () => {
      const input = illegalSudokuStrDigits
      assert.throws(
        () => getInvalidIdxsBySquaresRule(input),
        /Illegally formatted sudoku string/
      )
    })
  })
})
