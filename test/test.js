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

// Note: invalid
let filledSudoku = trimSudoku(`
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

// Note: variation of above, still invalid
let unfilledSudoku = trimSudoku(`
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

let invalidSudoku = trimSudoku(`
  1.. ..3 2..
  ... 41. .4.
  ..1 ..3 ...

  ... .1. ..2
  313 1.. ...
  ... .5. .2.
  
  2.. ..2 .4.
  ... 5.. 2..
  .5. .5. ...
`)

let solvedSudoku = trimSudoku(`
  725 139 684
  198 456 237
  463 827 591

  572 398 416
  689 541 723
  341 672 859

  237 984 165
  914 265 378
  856 713 942
`)

// Variant of solvedSudoku, not guaranteed to have one unique solution, but is
// guaranteed to be valid
let validSudoku = trimSudoku(`
  7.5 13. 684
  .98 ..6 ..7
  4.. 8.7 5..

  .7. 3.8 4.6
  6.. ..1 .23
  3.1 6.2 ..9

  ..7 ... 16.
  ..4 ... 3..
  8.6 ... 942
`)

describe('invalid indices for each rule', () => {
  describe('getInvalidIdxsBySquaresRule', () => {
    it('includes all invalid indices of invalidSudoku', () => {
      // setup
      const input = invalidSudoku
      const expected = []
      // exercise
      const result = getInvalidIdxsBySquaresRule(input)
      // verify
      assert.strictEqual(result, expected)
    })
    it('does not include valid indices of invalidSudoku')
    it('does not find invalid indices in validSudoku')
  })
})

describe('sudoku utility functions', () => {
  describe('getValueByRowCol and getIndexByRowCol', () => {
    it('returns the correct value for (0, 0) on unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = '.'
      // exercise
      const result = getValueByRowCol(input, 0, 0)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (0, 0) on filledSudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 1
      // exercise
      const result = getValueByRowCol(input, 0, 0)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (8, 0) on unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = 9
      // exercise
      const result = getValueByRowCol(input, 8, 0)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (4, 3) on unfilledSudoku', () => {
      // setup
      const input = unfilledSudoku
      const expected = '.'
      // exercise
      const result = getValueByRowCol(input, 4, 3)
      console.log(result, input)
      // verify
      assert.equal(result, expected)
    })
    it('returns the correct value for (4, 3) on filledSudoku', () => {
      // setup
      const input = filledSudoku
      const expected = 8
      // exercise
      const result = getValueByRowCol(input, 4, 3)
      console.log(result, input)
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
