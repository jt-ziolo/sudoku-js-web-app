import { assert } from 'chai'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

import { initializeSudokuGrid } from '../src/index.js'

const { document } = new JSDOM(`
    <!DOCTYPE html>
    <div id="sudoku"></div>
`).window

describe('construct sudoku grid', () => {
  describe('initializeSudokuGrid', () => {
    const sandbox = sinon.createSandbox()
    afterEach(() => {
      sandbox.restore()
    })
    it('throws an error when the document object is null', () => {
      // exercise & verify
      assert.throws(() => {
        initializeSudokuGrid(null)
      })
    })
    it("successfully calls getElementById with parameter 'sudoku'", () => {
      // setup
      sandbox.spy(document, 'getElementById')
      // exercise
      initializeSudokuGrid(document)
      // verify
      assert.equal(document.getElementById.getCall(0).args[0], 'sudoku')
    })
    it('successfully calls appendChild 81 times', () => {
      // setup
      sandbox.spy(document.getElementById('sudoku'), 'appendChild')
      // exercise
      initializeSudokuGrid(document)
      // verify
      assert.strictEqual(
        document.getElementById('sudoku').appendChild.callCount,
        81
      )
    })
  })
})
