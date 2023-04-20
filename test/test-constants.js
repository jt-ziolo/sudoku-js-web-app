const { getIndexByRowCol } = require('../src/index.js')

function trimSudoku (sudoku) {
  let temp = ''
  for (let n of sudoku) {
    temp += n.trim()
  }
  return temp
}

const illegalSudokuStrTooShort = trimSudoku(`
  1.. 456 789
  234 567 891
  345 678 912

  456 789 123
  567 891 234
  678 912 345

  789 123 456
  891 234 567
  912 345 67
`)

const illegalSudokuStrTooLong = trimSudoku(`
  1.. 456 789
  234 567 891
  345 678 912

  456 789 123
  567 891 234
  678 912 345

  789 123 456
  891 234 567
  912 345 678

  1
`)

const illegalSudokuStrDigits = trimSudoku(`
  1.. 456 789
  234 56M 891
  345 678 912

  456 789 123
  567 891 234
  67N 912 345

  789 123 456
  8K1 234 567
  912 345 678
`)

// Note: invalid
const filledSudoku = trimSudoku(`
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
const unfilledSudoku = trimSudoku(`
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

const invalidSudoku = trimSudoku(`
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

const solvedSudoku = trimSudoku(`
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

const invalidRowSudoku = solvedSudoku
invalidRowSudoku[0] = 1
invalidRowSudoku[getIndexByRowCol(1, 0)] = '.'

const invalidColSudoku = solvedSudoku
invalidColSudoku[0] = 5
invalidColSudoku[getIndexByRowCol(0, 2)] = '.'

const invalidSquareSudoku = solvedSudoku
invalidSquareSudoku[0] = 3
invalidSquareSudoku[getIndexByRowCol(0, 4)] = '.'
invalidSquareSudoku[getIndexByRowCol(5, 0)] = '.'

// Variant of solvedSudoku, not guaranteed to have one unique solution, but is
// guaranteed to be valid
const validSudoku = trimSudoku(`
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

const forExport = {
  validSudoku,
  invalidSudoku,
  invalidColSudoku,
  invalidRowSudoku,
  invalidSquareSudoku,
  filledSudoku,
  unfilledSudoku,
  solvedSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort
}

module.exports = forExport
