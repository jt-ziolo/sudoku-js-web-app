import { assert } from 'chai'
import sinon from 'sinon'

import { initializeSudokuGrid } from '../src/index.js'

describe('construct sudoku grid', () => {
  describe('initializeSudokuGrid', () => {
    describe('defined document object', () => {
      let document = {
        idPassedIn: null,
        childrenPassedIn: [],
        getElementById (id) {
          this.idPassedIn = id
          return {
            appendChild (child) {
              this.childrenPassedIn.push(child)
            }
          }
        }
      }
      beforeEach(() => {
        document.idPassedIn = null
        document.childPassedIn = null
      })
      it("successfully calls getElementById with parameter 'sudoku'", () => {
        // exercise
        initializeSudokuGrid()
        // verify
        assert.equal(document.idPassedIn, 'sudoku')
      })
      it('successfully calls appendChild 81 times', () => {
        // exercise
        initializeSudokuGrid()
        // verify
        assert.lengthOf(document.childrenPassedIn, 81)
      })
    })
    it('throws an error when the document object cannot be located', () => {
      // setup - none needed, mocha not aware of document object
      // exercise & verify
      assert.throws(() => {
        initializeSudokuGrid()
      }, ReferenceError)
    })
  })
})
