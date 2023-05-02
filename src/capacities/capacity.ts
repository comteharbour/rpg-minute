const keys = {
  activationMode: {
    AUTO: 'AUTO',
    ON_PLAYER_DEMAND: 'ON_PLAYER_DEMAND',
    ON_GM_DEMAND: 'ON_GM_DEMAND',
    ON_PLAYER_AND_GM_AGREE: 'ON_PLAYER_AND_GM_AGREE',
  },
};

export class Capacity {
  #authorisedAttributes: string[];
  #charges: number;
  #maxCharges: number;
  #maintenance: object;
  #activationMode: string;

  constructor() {
    this.#authorisedAttributes = [];
    this.#charges = 0;
    this.#maxCharges = 0;
    this.#maintenance = {
      encounter: [],
      day: [],
    };
    this.#activationMode = keys.activationMode.AUTO;
  }

  public isActivable = (actionAttribute: string): boolean => {
    if (!this.#authorisedAttributes.includes(actionAttribute)) return false;
    if (this.#charges < 1) return false;
    return true;
  };

  get authorisedAttributes() {
    return this.#authorisedAttributes;
  }

  set authorisedAttributes(newAuthorisedAttributes) {
    this.#authorisedAttributes = newAuthorisedAttributes;
  }

  private boundCharges = (unboundedCharges: number): number => {
    return Math.min(Math.max(unboundedCharges, 0), this.#maxCharges);
  };

  get charges() {
    return this.#charges;
  }

  set charges(newCharges) {
    this.#charges = this.boundCharges(newCharges);
  }

  public addCharges = (addedCharges: number): void => {
    this.#charges = this.boundCharges(this.#charges + addedCharges);
  };

  private boundMaxCharges = (unboundedMaxCharges: number): number => {
    return Math.max(unboundedMaxCharges, 0);
  };

  get maxCharges() {
    return this.#maxCharges;
  }

  set maxCharges(newMaxCharges) {
    this.#maxCharges = this.boundMaxCharges(newMaxCharges);
  }

  get maintenance() {
    return this.#maintenance;
  }

  set maintenance(newMaintenance) {
    this.#maintenance = newMaintenance;
  }

  get activationMode() {
    return this.#activationMode;
  }

  set activationMode(newActivationMode) {
    this.#activationMode = newActivationMode;
  }
}
