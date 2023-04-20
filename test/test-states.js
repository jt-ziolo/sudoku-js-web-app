const assert = require('chai').assert
const { getEmptyIdxs, isFilled, isValid, isSolved } = require('../src/index.js')
const {
  filledSudoku,
  unfilledSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort,
  invalidColSudoku,
  invalidRowSudoku,
  invalidSquareSudoku,
  partiallySolvedSudoku,
  solvedSudoku,
  invalidSudoku
} = require('./test-constants.js')
const { isSuperSet, isEqualSet } = require('./test-helpers.js')

describe('check if sudoku is solved (both valid and filled)', () => {
  describe('isSolved', () => {
    it('returns true for a sudoku that is both valid and filled', () => {
      // setup
      const input = solvedSudoku
      // exercise
      const result = isSolved(input)
      // verify
      assert.isTrue(result)
    })
    it('returns false for a sudoku that is valid but not filled', () => {
      // setup
      const input = partiallySolvedSudoku
      // exercise
      const result = isSolved(input)
      // verify
      assert.isFalse(result)
    })
    it('returns false for a sudoku that is filled but not valid', () => {
      // setup
      const input = filledSudoku
      // exercise
      const result = isSolved(input)
      // verify
      assert.isFalse(result)
    })
    it('returns false for a sudoku that is neither filled nor valid', () => {
      // setup
      const input = unfilledSudoku
      // exercise
      const result = isSolved(input)
      // verify
      assert.isFalse(result)
    })
  })
})
describe('check if sudoku is valid', () => {
  describe('isValid', () => {
    it('returns false for a sudoku not meeting the squares rule', () => {
      // setup
      const input = invalidSquareSudoku
      // exercise
      const result = isValid(input)
      // verify
      assert.isFalse(result)
    })
    it('returns false for a sudoku not meeting the rows rule', () => {
      // setup
      const input = invalidRowSudoku
      // exercise
      const result = isValid(input)
      // verify
      assert.isFalse(result)
    })
    it('returns false for a sudoku not meeting the cols rule', () => {
      // setup
      const input = invalidColSudoku
      // exercise
      const result = isValid(input)
      // verify
      assert.isFalse(result)
    })
    it('returns true for a sudoku meeting all rules, including one that is not filled', () => {
      // setup
      const input = partiallySolvedSudoku
      // exercise
      const result = isValid(input)
      // verify
      assert.isTrue(result)
    })
    it('returns true for a sudoku meeting all rules, including one that is filled', () => {
      // setup
      const input = solvedSudoku
      // exercise
      const result = isValid(input)
      // verify
      assert.isTrue(result)
    })
  })
})
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
      let input = filledSudoku
      input = input.slice(0, input.length - 1) + '.'
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
