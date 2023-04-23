import { assert } from 'chai'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

import { SudokuGrid, SudokuSquareNode } from '../src/index.js'

const { document } = new JSDOM(`
    <!DOCTYPE html>
    <div id="sudoku"></div>
`).window

describe('SudokuGrid', () => {
  describe('constructor', () => {
    const sandbox = sinon.createSandbox()
    afterEach(() => {
      sandbox.restore()
    })
    it('throws an error when the document object is null', () => {
      // exercise & verify
      assert.throws(() => {
        new SudokuGrid(null)
      })
    })
    it("successfully calls getElementById with parameter 'sudoku'", () => {
      // TODO: modify to align with new functionality
      // setup
      sandbox.spy(document, 'getElementById')
      // exercise
      new SudokuGrid(document)
      // verify
      assert.equal(document.getElementById.getCall(0).args[0], 'sudoku')
    })
    it('successfully calls appendChild 81 times', () => {
      // TODO: modify to align with new functionality
      // setup
      sandbox.spy(document.getElementById('sudoku'), 'appendChild')
      // exercise
      new SudokuGrid(document)
      // verify
      assert.strictEqual(
        document.getElementById('sudoku').appendChild.callCount,
        81
      )
    })
    describe('_values array post-initialization', () => {
      it('contains elements of type SudokuSquareNode', () => {
        // setup & exercise
        const grid = new SudokuGrid(document)
        const result = grid._values.pop()
        // verify
        assert.instanceOf(result, SudokuSquareNode)
      })
      it('only contains nodes for which the .domElement field is truthy', () => {
        // setup & exercise
        const grid = new SudokuGrid(document)
        for (let i of grid._values) {
          // verify
          assert.isOk(i.domElement)
        }
      })
      it('contains 81 truthy elements', () => {
        // setup & exercise
        const grid = new SudokuGrid(document)
        let count = 0
        for (let i of grid._values) {
          if (i) {
            count += 1
          }
        }
        // verify
        assert.strictEqual(count, 81)
      })
      it('is in order, the idx fields of the nodes match their _values idx', () => {
        // NOTE: will pass even if the _values array is empty
        // setup & exercise
        const grid = new SudokuGrid(document)
        for (let arrIdx in grid._values) {
          const storedIdx = grid._values[arrIdx].idx
          // verify
          assert.equal(storedIdx, arrIdx)
        }
      })
    })
  })
})
