import { AlgoSolver } from './index';

describe('Algo', () => {

  it('should transform a consonant in vowel', () => {
    const result = new AlgoSolver('B').solve();
    expect(result).toEqual('A');
  });

  it('should ignore char case', () => {
    expect(new AlgoSolver('b').solve()).toEqual('A');
    expect(new AlgoSolver('a').solve()).toEqual('A');
  });

  it('should transform string with only consonants in string with only vowels', () => {
    const result = new AlgoSolver('BBBBB').solve();
    expect(result).toEqual('AAAAA');
  });

  it('should find in input string the most repeated vowel', () => {
    const algoSolver = new AlgoSolver('CCIIIIICAAACICCYCAAAAAAAAAAACYCCI');
    expect(algoSolver.getRepeatableVowel()).toEqual('A');
  });

  it('should replace all consonants in string by the most repeated vowel', () => {
    const result = new AlgoSolver('BANANA').solve();
    expect(result).toEqual('AAAAAA');
  });

  it('should increment timer by 1 when a char transformation is apply', () => {
    const algoSolver = new AlgoSolver('BB');
    const result = algoSolver.solve();
    expect(result).toEqual('AA');
    expect(algoSolver.getTimerCounter()).toEqual(2);
  });

  test.each`
  input        | output       | timerCalled
  ${'BANANA'}  | ${'AAAAAA'}  | ${3}
  ${'FBHC'}    | ${'AAAA'}    | ${4}
  ${'FOXEN'}   | ${'OOOOO'}   | ${5}
  ${'SUFIANE'} | ${'UUUUUUU'} | ${9}
  `('should return $output with $input',
    ({
       input,
       output,
       timerCalled
     }) => {
      const algoSolver = new AlgoSolver(input);
      const result = algoSolver.solve();
      expect(result).toEqual(output);
      expect(algoSolver.getTimerCounter()).toEqual(timerCalled);
    });

});
