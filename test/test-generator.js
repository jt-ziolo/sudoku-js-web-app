import { assert } from 'chai'
import { random, XORShift } from 'random-seedable'

import sudokuGenLib from 'sudoku.utils'
const sudokuSolveLib = sudokuGenLib

class SudokuGenLibAdapter {
  constructor (randomSeed) {
    if (randomSeed) {
      this.rng = new XORShift(randomSeed)
    } else {
      this.rng = random
    }
    this.seed = randomSeed
  }
  generate (nGivens) {
    return sudokuGenLib.generate(nGivens, this.rng)
  }
}

class SudokuSolveLibAdapter {
  solve (sudokuStr) {
    return sudokuSolveLib.solve(sudokuStr)
  }
}

describe('sudoku generator library', () => {
  describe('adapter implementation', () => {
    it('generates with the correct number of givens')
    it('generates a valid sudoku (correctly formatted)')
    it('generates a sudoku which meets all rules')
    it('generates the same sudoku when the same seed is provided')
    it('generates a different sudoku when a different seed is provided')
    it('generates a different sudoku when no seed is provided')
  })
})
describe('sudoku solver library', () => {
  describe('adapter implementation', () => {
    it('results in a sudoku for which isSolved == true')
    it('throws an error when provided with an invalid sudoku string')
  })
})
