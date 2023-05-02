export class Rule {
  private readonly numberOfDice: number;
  private readonly twoByTwoSelection: (r1: number, r2: number) => number;
  private readonly initialValue: number;

  constructor(
    nbDice: number,
    twoByTwoSelection: (r1: number, r2: number) => number,
    initialValue: number
  ) {
    this.numberOfDice = nbDice;
    this.twoByTwoSelection = twoByTwoSelection;
    this.initialValue = initialValue;
  }

  public getFinalResult = (results: number[]): number => {
    return results.reduce(
      (bestResult: number, result: number) =>
        this.twoByTwoSelection(bestResult, result),
      this.initialValue
    );
  };

  public get nbDice(): number {
    return this.numberOfDice;
  }
}

const veryEasy = new Rule(3, Math.max, 0);

const easy = new Rule(2, Math.max, 0);

const normal = new Rule(1, (a, b) => b, 0);

const hard = new Rule(2, Math.min, Infinity);

const veryHard = new Rule(3, Math.min, Infinity);

export const keys = {
  VERY_EASY: 'VERY_EASY',
  EASY: 'EASY',
  NORMAL: 'NORMAL',
  HARD: 'HARD',
  VERY_HARD: 'VERY_HARD',
};

export function validator(string: string): boolean {
  const validStrings = Object.values(keys);
  if (!validStrings.includes(string)) {
    console.warn(
      `DiceRoller 'rule' prop must be one of '${validStrings.join("' or '")}'.`
    );
    return false;
  }
  return true;
}

export function getRule(key: string): Rule {
  switch (key) {
    case keys.VERY_EASY:
      return veryEasy;
    case keys.EASY:
      return easy;
    case keys.NORMAL:
      return normal;
    case keys.HARD:
      return hard;
    case keys.VERY_HARD:
      return veryHard;
    default:
      return normal;
  }
}
