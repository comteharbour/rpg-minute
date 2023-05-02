<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { pickAtRandom } from './helpers';

export default defineComponent({
  name: 'OneDice',

  data() {
    return {
      message: "Hi ! I'm a dice !",
      result: Infinity,
      state: 'idle',
    };
  },

  methods: {
    roll() {
      var diceArray = [1, 1, 2, 3, 3, 3, 3, 4, 5, 6, 6]; // TODO: access via inject
      this.result = pickAtRandom(diceArray);
      this.animate();
    },

    animate() {
      this.state = 'rolling';
      this.message = 'roll-roll-roll...';
      var duration = Math.random() * 1500 + 500;
      setTimeout(this.returnResult, duration);
    },

    returnResult() {
      this.$emit('giveResult', this.result);
      this.state = 'idle';
      this.message = `The result is ${this.result}`;
    },
  },

  mounted() {
    this.$emit('giveAccess', this.roll);
  },

  unmounted() {
    this.$emit('remove');
  },
});
</script>
