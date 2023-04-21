import { assert } from 'chai'
import {
  getEmptyIdxs,
  isSolved,
  isValid,
  validateSudokuStr,
  SudokuGenLibAdapter,
  SudokuSolveLibAdapter
} from '../src/index.js'
import { solvedSudoku, partiallySolvedSudoku } from './test-constants.js'

let genNoSeed = new SudokuGenLibAdapter()
let gen1Seed1 = new SudokuGenLibAdapter(2)
let gen2Seed1 = new SudokuGenLibAdapter(2)
let gen3Seed2 = new SudokuGenLibAdapter(2572395)
const solver = new SudokuSolveLibAdapter()

describe('sudoku generator library', () => {
  describe('adapter implementation', () => {
    beforeEach(() => {
      genNoSeed = genNoSeed.reset()
      gen1Seed1 = gen1Seed1.reset()
      gen2Seed1 = gen2Seed1.reset()
      gen3Seed2 = gen3Seed2.reset()
    })
    it('generates with the correct number of givens', () => {
      // exercise
      const nGivens = 42
      const result = gen1Seed1.generate(nGivens)
      // verify
      assert.strictEqual(getEmptyIdxs(result).size, 81 - nGivens)
    })
    it('generates a valid sudoku (correctly formatted)', () => {
      // exercise
      const result = gen1Seed1.generate()
      // verify
      validateSudokuStr(result)
    })
    it('generates a sudoku which meets all rules', () => {
      // exercise
      const result = gen1Seed1.generate()
      // verify
      assert.isTrue(isValid(result))
    })
    it('generates the same sudoku when the same seed is provided', () => {
      // exercise
      const resultA = gen1Seed1.generate()
      const resultB = gen2Seed1.generate()
      // verify
      assert.strictEqual(resultA, resultB)
    })
    it('generates a different sudoku on subsequent generate calls', () => {
      // exercise
      const resultA = gen1Seed1.generate()
      const resultB = gen1Seed1.generate()
      // verify
      assert.notStrictEqual(resultA, resultB)
    })
    it('generates a different sudoku when a different seed is provided', () => {
      // exercise
      const resultA = gen1Seed1.generate()
      const resultB = gen3Seed2.generate()
      // verify
      assert.notStrictEqual(resultA, resultB)
    })
    it('generates a different sudoku when no seed is provided', () => {
      // exercise
      const resultA = genNoSeed.generate()
      genNoSeed = genNoSeed.reset()
      const resultB = genNoSeed.generate()
      // verify
      assert.notStrictEqual(resultA, resultB)
    })
  })
})
describe('sudoku solver library', () => {
  describe('adapter implementation', () => {
    it('solves partiallySolvedSudoku to yield solvedSudoku', () => {
      // setup
      const expected = solvedSudoku
      // exercise
      const result = solver.solve(partiallySolvedSudoku)
      // verify
      assert.strictEqual(result, expected)
    })
    it('results in a sudoku for which isSolved == true', () => {
      // exercise
      const result = solver.solve(partiallySolvedSudoku)
      // verify
      assert.isTrue(isSolved(result))
    })
    it('throws an error when provided with an invalid sudoku string', () => {
      // exercise and verify
      assert.throws(() => {
        solver.solve('320582')
      })
    })
  })
})
