const assert = require('chai').assert

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

const forExport = {
  isSuperSet
}

module.exports = forExport
