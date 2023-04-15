const assert = require('chai').assert
const exported = require('../src/index.js')
const getValueByRowCol = exported.getValueByRowCol

function trimSudoku (sudoku) {
  let temp = ''
  for (let n of sudoku) {
    temp += n.trim()
  }
  return temp
}

let solvedSudoku = trimSudoku(`
    123 456 789
    234 567 891
    345 678 912

    456 789 123
    567 891 234
    678 912 345

    789 123 456
    891 234 567
    912 345 678
`)

let unsolvedSudoku = trimSudoku(`
    .23 456 789
    234 .67 891
    345 678 912

    456 789 123
    567 .91 2.4
    678 912 345

    789 123 456
    8.1 234 567
    912 345 6.8
`)
console.log(solvedSudoku)

describe('sudoku utility functions', () => {
  describe('getValueByRowCol', () => {
    it('returns the correct value for (0, 0) on unsolvedSudoku', () => {
      // setup
      const input = unsolvedSudoku
      const expected = '.'
      // exercise
      const result = getValueByRowCol(input, 0, 0)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (0, 0) on solvedSudoku', () => {
      // setup
      const input = solvedSudoku
      const expected = 1
      // exercise
      const result = getValueByRowCol(input, 0, 0)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (8, 0) on unsolvedSudoku', () => {
      // setup
      const input = unsolvedSudoku
      const expected = 9
      // exercise
      const result = getValueByRowCol(input, 8, 0)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (4, 3) on unsolvedSudoku', () => {
      // setup
      const input = unsolvedSudoku
      const expected = '.'
      // exercise
      const result = getValueByRowCol(input, 4, 3)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (4, 3) on solvedSudoku', () => {
      // setup
      const input = solvedSudoku
      const expected = 8
      // exercise
      const result = getValueByRowCol(input, 4, 3)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('throws RangeError for (-1, *)', () => {
      // setup
      const input = unsolvedSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, -1, i), RangeError)
      }
    })
    it('throws RangeError for (*, -1)', () => {
      // setup
      const input = unsolvedSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, i, -1), RangeError)
      }
    })
    it('throws RangeError for (-1, -1)', () => {
      // setup
      const input = unsolvedSudoku // does not matter which
      // exercise and verify
      assert.throws(() => getValueByRowCol(input, -1, -1), RangeError)
    })
    it('throws RangeError for (9, *)', () => {
      // setup
      const input = unsolvedSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, 9, i), RangeError)
      }
    })
    it('throws RangeError for (*, 9)', () => {
      // setup
      const input = unsolvedSudoku // does not matter which
      // exercise and verify
      for (let i = 0; i < 9; i++) {
        assert.throws(() => getValueByRowCol(input, i, 9), RangeError)
      }
    })
    it('throws RangeError for (9, 9)', () => {
      // setup
      const input = unsolvedSudoku // does not matter which
      // exercise and verify
      assert.throws(() => getValueByRowCol(input, 9, 9), RangeError)
    })
  })
})
