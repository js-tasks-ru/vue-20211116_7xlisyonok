<template>
  <button @click="incCount">{{ innerCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      innerCount: this.count,
    };
  },

  watch: {
    count(newValue) {
      this.innerCount = newValue;
    },
  },

  methods: {
    incCount() {
      this.$emit('update:count', ++this.innerCount);
    },
  },
};
</script>
