function getDiceCapacities(characterCapacities, mode) {
  return characterCapacities.filter(
    (capacity) => capacity.context == 'dice' && capacity.mode == mode
  );
}

export function getActiveDiceCapacities(characterCapacities) {
  return getDiceCapacities(characterCapacities, 'active');
}

export function getPassiveDiceCapacities(characterCapacities) {
  return getDiceCapacities(characterCapacities, 'passive');
}

// export const keys = {
//   rechargeAfter: {
//     ENCOUNTER: "ENCOUNTER",
//     DAY: "DAY",
//     NEVER: "NEVER",
//   },
//   activationMode: {
//     AUTO: "AUTO",
//     ON_PLAYER_DEMAND: "ON_PLAYER_DEMAND",
//     ON_GM_DEMAND: "ON_GM_DEMAND",
//     ON_PLAYER_AND_GM_AGREE: "ON_PLAYER_AND_GM_AGREE",
//   },
//   selectableDice: { ALL: "ALL", GREATEST: "GREATEST", SMALLEST: "SMALLEST" },
//   selectionMode: {
//     RANDOM: "RANDOM",
//     SMALLEST: "SMALLEST",
//     GREATEST: "GREATEST",
//     MANUAL: "MANUAL",
//   },
//   effect: {
//     REROLL: "REROLL",
//     INCREASE_RESULT_BY: "INCREASE_RESULT_BY",
//     REPLACE_RESULT_BY: "REPLACE_RESULT_BY",
//     STORE_AT: "STORE_AT",
//     SET_AUTHORISED_ATTRIBUTES_TO: "SET_AUTHORISED_ATTRIBUTES_TO",
//     SET_CHARGE_TO: "SET_CHARGE_TO",
//     SET_ACTIVATION_MODE_TO: "SET_ACTIVATION_MODE_TO",
//     SET_SELECTABLE_DICE_TO: "SET_SELECTABLE_DICE_TO",
//     SET_SELECTABLE_AMOUNT_TO: "SET_SELECTABLE_AMOUNT_TO",
//     SET_EFFECT_TO: "SET_EFFECT_TO",
//     // faire des getters ou des accès aux données
//   },
// };

export function isActivable({ actionAttribute, availableCharges }) {
  let authorisedAttributes = ['physic', 'psychic'];
  let minCharges = 1;
  if (!authorisedAttributes.contains(actionAttribute)) return false;
  if (availableCharges < minCharges) return false;
  return true;
}

export const exampleCapacity1 = {
  authorisedAttributes: ['physic', 'psychic'],

  charges: 1,

  maxCharges: 1,

  rechargeAfter: keys.rechargeAfter.NEVER,

  activationMode: keys.activationMode.ON_PLAYER_DEMAND,

  selectableDice: keys.selectableDice.ALL,

  selectableAmount: { min: 0, max: Infinity }, // plutôt mettre un seul nombre

  selectionMode: keys.selectionMode.MANUAL,

  effect: [
    [keys.effect.STORE_AT, 'savedResults', 'capacité2'],
    [keys.effect.REROLL],
    [keys.effect.SET_CHARGE_TO, 0],
    [keys.effect.SET_CHARGE_TO, 1, 'capacité2'],
  ],

  /**
   * Idéalement, il faudrait pouvoir faire des capacités avec effets différents sur des dés différents, de manière contrôlée.
   *
   * Problème, il faut une interface plus flexible. Est-ce ergonomique ?
   *
   * Il y a moyen de faire un choix conditionnel dans la programmation de la compétence.
   *
   * Cela engendre de la complexité supplémentaire, pour développer et pour l'utilisateur. Est-ce un réel gain?
   *
   * Pour commencer, on va faire le même effet sur tous les dés selectionnés.
   * Il faut faire attention à bien sauvegarder tous les résultats, pas overrider pour chaque dé.
   */
};

/**
 * il faut mettre une référence vers une adresse modifiable pour chaque donnée qui peut être modifiée.
 * ou bien il faut envoyer un setter à la capacité qui y a accès
 */

export const exampleCapacity2 = {
  activable({ actionAttribute, availableCharges }) {
    let authorisedAttributes = ['physic', 'psychic']; // nécessite de transmettre des contraintes de la capacité précédente
    let minCharges = 1;
    if (!authorisedAttributes.contains(actionAttribute)) return false;
    if (availableCharges < minCharges) return false;
    return true;
  },

  activation: keys.activation.AUTO,

  selectable: keys.selectable.ALL,

  selectableAmount: { min: 2, max: 2 }, // nécessite de transmettre des contraintes de la capacité précédente

  selectionMode: keys.selectionMode.GREATEST,

  effect: [
    [keys.effect.REPLACE_RESULT_BY, 'adresse'],
    [keys.effect.INCREASE_CHARGE_BY, -1],
    [keys.effect.INCREASE_CHARGE_BY, 1, 'capacité1'],
  ],
};

class Capacity {
  #keys;
  #authorisedAttributes;
  #charges;
  #maxCharges;
  #maintenance;
  #activationMode;

  constructor() {
    this.#keys = {
      maintenancePeriod: {
        ENCOUNTER: 'ENCOUNTER',
        DAY: 'DAY',
      },
      activationMode: {
        AUTO: 'AUTO',
        ON_PLAYER_DEMAND: 'ON_PLAYER_DEMAND',
        ON_GM_DEMAND: 'ON_GM_DEMAND',
        ON_PLAYER_AND_GM_AGREE: 'ON_PLAYER_AND_GM_AGREE',
      },
    };
    this.#authorisedAttributes = [];
    this.#charges = 0;
    this.#maxCharges = 0;
    this.#maintenance = {
      [this.#keys.maintenancePeriod.ENCOUNTER]: [],
      [this.#keys.maintenancePeriod.DAY]: [],
    };
    this.#activationMode = this.#keys.activationMode.AUTO;
  }

  isActivable(actionAttribute) {
    if (!this.#authorisedAttributes.contains(actionAttribute)) return false;
    if (this.#charges < 1) return false;
    return true;
  }

  static get keys() {
    return this.#keys;
  }

  get authorisedAttributes() {
    return this.#authorisedAttributes;
  }

  set authorisedAttributes(newAuthorisedAttributes) {
    this.#authorisedAttributes = newAuthorisedAttributes;
  }

  get charges() {
    return this.#charges;
  }

  set charges(newcharges) {
    this.#charges = newcharges;
  }

  get maxCharges() {
    return this.#maxCharges;
  }

  set maxCharges(newmaxCharges) {
    this.#maxCharges = newmaxCharges;
  }

  get maintenance() {
    return this.#maintenance;
  }

  set maintenance(newmaintenance) {
    this.#maintenance = newmaintenance;
  }

  get activationMode() {
    return this.#activationMode;
  }

  set activationMode(newactivationMode) {
    this.#activationMode = newactivationMode;
  }
}

class DiceCapacity {
  #authorisedAttributes;
  #charges;
  #maxCharges;
  #rechargeAfter;
  #activationMode;
  #selectableDice;
  #selectableAmount;
  #selectionMode;
  #effect;

  constructor() {
    this.#authorisedAttributes = [];
    this.#charges = 0;
    this.#maxCharges = 0;
    this.#rechargeAfter = {};
    this.#activationMode = keys.activationMode.AUTO;
    this.#selectableDice = keys.selectableDice.ALL;
    this.#selectableAmount = 0;
    this.#selectionMode = keys.selectionMode.RANDOM;
    this.#effect = [];
  }

  get authorisedAttributes() {
    return this.#authorisedAttributes;
  }

  set authorisedAttributes(newAuthorisedAttributes) {
    this.#authorisedAttributes = newAuthorisedAttributes;
  }
}
