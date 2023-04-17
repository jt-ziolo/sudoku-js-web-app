const assert = require('chai').assert
const exported = require('../src/index.js')
const {
  filledSudoku,
  unfilledSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort
} = require('./test-constants.js')
const { isSuperSet } = require('./test-helpers.js')

// const getRowColByIndex = exported.getEmptyIdxs
const getEmptyIdxs = sudokuStr => {
  throw Error('not implemented')
}

describe('get empty indices and check if sudoku is filled', () => {
  describe('getEmptyIdxs', () => {
    it('returns an empty set for a filled sudoku', () => {
      // setup
      const input = filledSudoku
      const expected = new Set()
      // exercise
      const result = getEmptyIdxs(input)
      // verify
      assert.isStrictEqual(result, expected)
    })
    it('includes all empty indices of unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = new Set() // TODO: fill
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
      const unfilledIndices = new Set() // TODO: fill

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
    // TODO: add for other tests
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
