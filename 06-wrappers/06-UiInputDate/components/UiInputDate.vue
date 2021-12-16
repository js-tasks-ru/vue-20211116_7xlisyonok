<template>
  <ui-input ref="uiInput" v-model="modelValueFormatted" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import moment from 'moment';
import UiInput from './UiInput';

const DateTypeList = ['date', 'time', 'datetime-local'];

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => DateTypeList.includes(value),
    },

    modelValue: {
      default: null,
    },
  },

  emits: ['change', 'update:modelValue'],

  data() {
    return {
      valueAsNumber: this.modelValue,
    };
  },

  computed: {
    dateTypeFormat() {
      if (this.type === 'time') {
        const step = this.$attrs.step;
        if (step && +step % 60 !== 0) {
          return 'HH:mm:ss';
        }
        return 'HH:mm';
      }

      if (this.type === 'datetime-local') {
        return 'YYYY-MM-DDTHH:mm';
      }

      return 'YYYY-MM-DD';
    },

    modelValueFormatted: {
      get() {
        return moment(this.modelValue).utc().format(this.dateTypeFormat);
      },
      set(newValue) {
        const newModelValue = this.$refs.uiInput.$refs.input.valueAsNumber;
        this.$emit('update:modelValue', newModelValue);
      },
    },
  },
};
</script>
