<template>
  <component :is="tag" class="button" :class="classList" :type="componentType">
    <slot />
  </component>
</template>

<script>
const ButtonVariantClass = {
  primary: 'button_primary',
  secondary: 'button_secondary',
  danger: 'button_danger',
};

export default {
  name: 'UiButton',
  props: {
    tag: {
      type: String,
      default: 'button',
    },

    variant: {
      type: String,
      default: 'secondary',
      validator: (value) => value in ButtonVariantClass,
    },

    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonVarinatClass() {
      return ButtonVariantClass[this.variant];
    },

    classList() {
      const result = [this.buttonVarinatClass];
      if (this.block) result.push('button_block');
      return result;
    },

    isButtonTag() {
      if (typeof this.tag !== 'string') return false;
      return this.tag.toLowerCase() === 'button';
    },

    componentType() {
      if (this.isButtonTag) return this.$attrs.type || 'button';
      return this.$attrs.type;
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
