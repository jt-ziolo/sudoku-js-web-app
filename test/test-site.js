import { assert } from 'chai'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

import { SudokuGrid } from '../src/index.js'

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
    it('populates _values array with 81 squares')
    it(
      'populates _values array in order, the idx fields of the nodes match their _values idx'
    )
  })
})
