function trimSudoku (sudoku) {
  let temp = ''
  for (let n of sudoku) {
    temp += n.trim()
  }
  return temp
}

const illegalSudokuStrWhitespaceNewline = `1..456789234567891345678\n12456789123567891234678912345789123456891234567912345678`
const illegalSudokuStrWhitespaceSingle = `1..456789 234567891345678912456789123567891234678912345789123456891234567912345678`

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

const blankSudoku = trimSudoku(`
  ... ... ...
  ... ... ...
  ... ... ...

  ... ... ...
  ... ... ...
  ... ... ...

  ... ... ...
  ... ... ...
  ... ... ...
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

const partiallySolvedSudoku = trimSudoku(`
  725 .39 684
  198 456 237
  .63 8.7 591

  .72 398 ..6
  689 5.. 723
  341 672 859

  .37 984 .65
  9.4 .6. 378
  8.6 713 942
`)

const invalidSquareSudoku = trimSudoku(`
  325 1.9 684
  198 456 237
  463 827 591

  572 398 416
  689 541 723
  .41 672 859

  237 984 165
  914 265 378
  856 713 942
`)

const invalidColSudoku = trimSudoku(`
  52. 139 684
  198 456 237
  463 827 591

  572 398 416
  689 541 723
  341 672 859

  237 984 165
  914 265 378
  856 713 942
`)

const invalidRowSudoku = trimSudoku(`
  125 139 684
  .98 456 237
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

export {
  validSudoku,
  invalidSudoku,
  invalidColSudoku,
  invalidRowSudoku,
  invalidSquareSudoku,
  partiallySolvedSudoku,
  filledSudoku,
  unfilledSudoku,
  solvedSudoku,
  illegalSudokuStrDigits,
  illegalSudokuStrTooLong,
  illegalSudokuStrTooShort,
  illegalSudokuStrWhitespaceNewline,
  illegalSudokuStrWhitespaceSingle,
  blankSudoku
}
