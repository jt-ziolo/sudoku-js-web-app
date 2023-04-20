const assert = require('chai').assert
const { getEmptyIdxs, isFilled } = require('../src/index.js')
const {
  filledSudoku,
  unfilledSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort
} = require('./test-constants.js')
const { isSuperSet, isEqualSet } = require('./test-helpers.js')

describe('get empty indices and check if sudoku is filled', () => {
  describe('isFilled', () => {
    it('returns true for a filled sudoku', () => {
      // setup
      const input = filledSudoku
      // exercise
      const result = isFilled(input)
      // verify
      assert.isTrue(result)
    })
    it('returns false for an unfilled sudoku (many unfilled spots)', () => {
      // setup
      const input = unfilledSudoku
      // exercise
      const result = isFilled(input)
      // verify
      assert.isFalse(result)
    })
    it('returns false for an unfilled sudoku (one unfilled spot)', () => {
      // setup
      const input = filledSudoku
      input[input.length - 1] = '.'
      // exercise
      const result = isFilled(input)
      // verify
      assert.isFalse(result)
    })
  })
  describe('getEmptyIdxs', () => {
    it('returns an empty set for a filled sudoku', () => {
      // setup
      const input = filledSudoku
      const expected = new Set()
      // exercise
      const result = getEmptyIdxs(input)
      // verify
      assert.isTrue(isEqualSet(result, expected), 'not equal')
    })
    it('includes all empty indices of unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = new Set([0, 12, 39, 43, 64, 79])
      // exercise
      const result = getEmptyIdxs(input)
      // verify
      assert.isTrue(
        isSuperSet(result, expected),
        'lacks one or more of the expected empty indices'
      )
    })
    it('does not include filled indices of unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const unfilledIndices = new Set([0, 12, 39, 43, 64, 79])

      const filledIndices = new Set()
      for (let i = 0; i < 81; i++) {
        if (unfilledIndices.has(i)) {
          continue
        }
        filledIndices.add(i)
      }
      // exercise
      const result = getEmptyIdxs(input)
      // verify
      for (const next of result) {
        assert.isFalse(
          filledIndices.has(next),
          'contains one or more valid indices'
        )
      }
    })
    it('throws an error when provided with an invalid sudoku string (too short)', () => {
      const input = illegalSudokuStrTooShort
      assert.throws(
        () => getEmptyIdxs(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (too long)', () => {
      const input = illegalSudokuStrTooLong
      assert.throws(
        () => getEmptyIdxs(input),
        /Illegally formatted sudoku string/
      )
    })
    it('throws an error when provided with an invalid sudoku string (illegal digits)', () => {
      const input = illegalSudokuStrDigits
      assert.throws(
        () => getEmptyIdxs(input),
        /Illegally formatted sudoku string/
      )
    })
  })
})
