import { assert } from 'chai'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

import { SudokuGrid, SudokuSquareNode } from '../src/index.js'

let document = new JSDOM(`
  <!DOCTYPE html>
  <div id="sudoku"></div>
  <ul id="template-big-square"></ul>
  <li id="template-square">
    <div class="pencilmarks">
      <sub class="hidden">1</sub>
      <sub class="hidden">2</sub>
      <sub class="hidden">3</sub>
      <sub class="hidden">4</sub>
      <sub class="hidden">5</sub>
      <sub class="hidden">6</sub>
      <sub class="hidden">7</sub>
      <sub class="hidden">8</sub>
      <sub class="hidden">9</sub>
    </div>
    <strong class="hidden"></strong>
  </li>
`).window.document

describe('SudokuGrid', () => {
  describe('constructor', () => {
    const sandbox = sinon.createSandbox()
    beforeEach(() => {
      document = new JSDOM(`
        <!DOCTYPE html>
        <div id="sudoku"></div>
        <ul id="template-big-square"></ul>
        <li id="template-square">
          <div class="pencilmarks">
            <sub class="hidden">1</sub>
            <sub class="hidden">2</sub>
            <sub class="hidden">3</sub>
            <sub class="hidden">4</sub>
            <sub class="hidden">5</sub>
            <sub class="hidden">6</sub>
            <sub class="hidden">7</sub>
            <sub class="hidden">8</sub>
            <sub class="hidden">9</sub>
          </div>
          <strong class="hidden"></strong>
        </li>
      `).window.document
    })
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
      // setup
      sandbox.spy(document, 'getElementById')
      // exercise
      new SudokuGrid(document)
      // verify
      assert.equal(document.getElementById.getCall(0).args[0], 'sudoku')
    })
    it('successfully calls appendChild 9 times (9 3x3 squares)', () => {
      // setup
      sandbox.spy(document.getElementById('sudoku'), 'appendChild')
      // exercise
      new SudokuGrid(document)
      // verify
      assert.strictEqual(
        document.getElementById('sudoku').appendChild.callCount,
        9
      )
    })
    describe('_nodes array post-initialization', () => {
      it('contains elements of type SudokuSquareNode', () => {
        // setup & exercise
        const grid = new SudokuGrid(document)
        const result = grid._nodes.pop()
        // verify
        assert.instanceOf(result, SudokuSquareNode)
      })
      it('only contains nodes for which the .domElement field is truthy', () => {
        // setup & exercise
        const grid = new SudokuGrid(document)
        for (let i of grid._nodes) {
          // verify
          assert.isOk(i.domElement)
        }
      })
      it('contains 81 truthy elements', () => {
        // setup & exercise
        const grid = new SudokuGrid(document)
        let count = 0
        for (let i of grid._nodes) {
          if (i) {
            count += 1
          }
        }
        // verify
        assert.strictEqual(count, 81)
      })
      it('is in order, the idx fields of the nodes match their _nodes idx', () => {
        // NOTE: will pass even if the _nodes array is empty
        // setup & exercise
        const grid = new SudokuGrid(document)
        for (let arrIdx in grid._nodes) {
          const storedIdx = grid._nodes[arrIdx].idx
          // verify
          assert.equal(storedIdx, arrIdx)
        }
      })
    })
  })
})
