export class AlgoSolver {

  static DEFAULT_VOWEL = 'A';
  static DEFAULT_CONSONANT = 'B';
  static VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];

  private _repeatableVowel = AlgoSolver.DEFAULT_VOWEL;
  private _originalStr = '';
  private _formattedStr = '';
  private _timer = 0;

  constructor(str = '') {
    this._originalStr = str.toUpperCase();
    this.findAndSetRepeatableVowel();
  }

  solve() {
    while (!this.formattedStringHasOnlyVowels() || !this.formattedStringAndOriginalStringHaveSameLength()) {

      const currentFormattedStr = this._formattedStr || this._originalStr;
      this._formattedStr = '';

      for (const char of currentFormattedStr) {
        this._formattedStr += this.transformChar(char);
        if (this.transformCharHasBeenApply(char)) {
          this._timer++;
        }
      }
    }

    return this._formattedStr;
  }

  getRepeatableVowel(): string {
    return this._repeatableVowel;
  }

  private formattedStringHasOnlyVowels(): boolean {
    return [...this._formattedStr].every(char => this.isVowel(char));
  }

  private formattedStringAndOriginalStringHaveSameLength(): boolean {
    return this._formattedStr.length === this._originalStr.length;
  }

  private findAndSetRepeatableVowel(): void {
    const repeatedVowelsMap = this.createVowelAndRepeatedTimeMap();
    const mostRepeatedVowel = this.getMostRepeatedVowel(repeatedVowelsMap);
    this._repeatableVowel = mostRepeatedVowel || AlgoSolver.DEFAULT_VOWEL;
  }

  private createVowelAndRepeatedTimeMap(): Map<string, number> {
    return [...this._originalStr]
      .filter((char: string) => AlgoSolver.VOWELS.includes(char))
      .reduce((vowelMap: Map<string, number>, char: string) => {
        const vowelRepeatedNTimes = vowelMap.get(char) ?? 0;
        return vowelMap.set(char, vowelRepeatedNTimes + 1);
      }, new Map());
  }

  private getMostRepeatedVowel(repeatedVowelCharMap: Map<string, number>): string | undefined {
    if (repeatedVowelCharMap.size === 0)
      return undefined;
    const [vowel] = this.sortByRepeatedValue(repeatedVowelCharMap)[0];
    return vowel;
  }

  private sortByRepeatedValue(repeatedVowelCharMap: Map<string, number>): [string, number][] {
    return [...repeatedVowelCharMap.entries()].sort(([, score1], [, score2]) => score2 - score1);
  }

  private transformChar(char: string): string {
    if (this.isVowel(char) && !this.isRepeatableVowel(char))
      return AlgoSolver.DEFAULT_CONSONANT;
    return this._repeatableVowel;
  }

  private isVowel(char: string): boolean {
    return AlgoSolver.VOWELS.includes(char);
  }

  private isRepeatableVowel(char: string): boolean {
    return char === this._repeatableVowel;
  }

  getTimerCounter(): number {
    return this._timer;
  }

  private transformCharHasBeenApply(char: string): boolean {
    return this._formattedStr.charAt(this._formattedStr.length - 1) !== char;
  }
}
