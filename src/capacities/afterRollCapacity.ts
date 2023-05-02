import { Capacity } from './capacity';

enum selectableDice {
  All,
  Greatest,
  Smallest,
}

enum selectionMode {
  Manual,
  AutoRandom,
  AutoFromGreatest,
  AutoFromSmallest,
}

/**
 * Certains effets devraient être accessibles à la classe "Capacity"
 */
enum effect {
  Reroll,
  IncreaseResultBy,
  ReplaceResultBy,
  StoreAt,
  SetAuthorisedAttributesTo,
  SetChargeTo,
  SetActivationModeTo,
  SetSelectableDiceTo,
  SetSelectableAmountTo,
  SetEffectTo,
}

export class AfterRollCapacity extends Capacity {
  #selectableDice: selectableDice;
  #selectableAmount: number;
  #selectionMode: selectionMode;
  #effect: effect[];

  constructor() {
    super();
    this.#selectableDice = selectableDice.All;
    this.#selectableAmount = 3;
    this.#selectionMode = selectionMode.AutoRandom;
    this.#effect = [];
  }
}
