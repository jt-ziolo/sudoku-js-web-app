const assert = require('chai').assert
const exported = require('../src/index.js')
const getValueByRowCol = exported.getValueByRowCol
const getIndexByRowCol = exported.getIndexByRowCol
const getRowColByIndex = exported.getRowColByIndex
const getInvalidIdxsBySquaresRule = exported.getInvalidIdxsBySquaresRule

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

function isSuperSet (set, subset) {
  for (const element of subset) {
    if (!set.has(element)) {
      return false
    }
  }
  return true
}

describe('test functions', () => {
  describe('isSuperSet', () => {
    it('returns true for [1, 2] as subset of [1. 2. 3. 4. 5]', () => {
      assert.isTrue(isSuperSet(new Set([1, 2, 3, 4, 5]), new Set([1, 2])))
    })
    it('returns false for [1, 2] as superset of [1. 2. 3. 4. 5]', () => {
      assert.isFalse(isSuperSet(new Set([1, 2]), new Set([1, 2, 3, 4, 5])))
    })
    it('returns true for [] as subset of [1. 2. 3. 4. 5]', () => {
      assert.isTrue(isSuperSet(new Set([1, 2, 3, 4, 5]), new Set()))
    })
  })
})

describe('invalid indices for each rule', () => {
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
  })
})

describe('sudoku utility functions', () => {
  describe('getRowColByIndex', () => {
    it('is the inverse of getIndexByRowCol, returns original input', () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          let idx = getIndexByRowCol(row, col)
          let [resultRow, resultCol] = getRowColByIndex(idx)
          assert.strictEqual(resultRow, row)
          assert.strictEqual(resultCol, col)
        }
      }
    })
  })
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
