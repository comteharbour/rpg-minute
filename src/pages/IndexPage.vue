<template>
  <q-page class="row items-center justify-evenly">
    <dice-roller :ruleName="rule" />
    <q-btn @click="increment">{{ rule }}</q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DiceRoller from 'components/dice/DiceRoller.vue';
import { keys } from 'components/dice/rules';

export default defineComponent({
  name: 'IndexPage',
  components: { DiceRoller },
  data() {
    return {
      counter: 2,
    };
  },
  computed: {
    rule() {
      return Object.values(keys)[this.counter % 5];
    },
  },
  methods: {
    increment() {
      this.counter++;
    },
  },
});
</script>
