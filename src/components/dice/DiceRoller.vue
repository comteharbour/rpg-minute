<template>
  <div>
    <div>Hi, I'm a dice roller</div>
    <div>
      <OneDice
        v-for="n in nbDice"
        :key="n - 1"
        @giveAccess="($event) => initializeOneDice($event, n - 1)"
        @giveResult="($event) => handleResult($event, n - 1)"
        @remove="() => removeOneDice(n - 1)"
      />
    </div>
    <q-btn @click="rollAllDice">Roll</q-btn>
    <q-toggle v-model="activableCapacity" />
    <div>{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OneDice from 'components/dice/OneDice.vue';
import * as rules from 'components/dice/rules';
import { AfterRollCapacity } from 'src/capacities/afterRollCapacity';
// import {
//   getActiveDiceCapacities,
//   getPassiveDiceCapacities,
// } from 'components/dice/diceCapacities';

export default defineComponent({
  name: 'DiceRoller',

  components: { OneDice },

  data() {
    return {
      dice: [] as {
        roll: () => void;
        result: number;
      }[],
      activableCapacity: false,
      message: 'please roll the dice',
      finalResult: Infinity,
      capacity: new AfterRollCapacity(),
    };
  },

  props: {
    ruleName: {
      type: String,
      default: () => rules.keys.NORMAL,
      validator: rules.validator,
    },

    characterCapacities: Array,
  },

  computed: {
    rule() {
      return rules.getRule(this.ruleName);
    },

    nbDice() {
      return this.rule.nbDice;
    },

    getFinalResult() {
      return this.rule.getFinalResult;
    },

    // passiveCapacities() {
    //   return getPassiveDiceCapacities(this.characterCapacities);
    // },

    // activeCapacities() {
    //   return getActiveDiceCapacities(this.characterCapacities);
    // },
  },

  methods: {
    initializeOneDice($event: () => void, index: number) {
      this.dice[index] = {
        roll: $event,
        result: Infinity,
      };
    },
    removeOneDice(index: number) {
      this.dice.splice(index, 1);
    },
    rollAllDice() {
      this.message = 'rolling...';
      if (this.dice.every((oneDice) => !!oneDice.roll)) {
        this.dice.forEach((oneDice) => {
          oneDice.result = Infinity;
          oneDice.roll();
        });
      }
    },
    handleResult($event: number, index: number) {
      this.dice[index].result = $event;
      if (this.dice.every((oneDice) => oneDice.result < Infinity)) {
        this.handleActivableCapacities();
      }
    },
    handleActivableCapacities() {
      if (this.activableCapacity) {
        this.message = 'do your activable capacity';
        /**
         * Les dés deviennent sélectionnables / paramétrables / selon la capacité
         * Puis il faut valider
         */
      } else {
        this.handlePassiveCapacities();
      }
    },
    handlePassiveCapacities() {
      this.handleRule();
    },
    handleRule() {
      const diceResults = this.dice.map((oneDice) => oneDice.result);
      this.finalResult = this.getFinalResult(diceResults);
      this.message = `And the final result is ${this.finalResult} !`;
    },
  },
});
</script>
