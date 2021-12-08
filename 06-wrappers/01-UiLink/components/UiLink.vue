<template>
  <component :is="tag" class="link" :to="to">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',
  props: {
    tag: {
      type: String,
      default: 'router-link',
    },
    to: {
      type: String,
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
