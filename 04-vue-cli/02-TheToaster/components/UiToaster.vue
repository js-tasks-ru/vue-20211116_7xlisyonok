<template>
    <div class="toasts">
        <UiToast v-for="toast in toastList" :key="toast.id" :toast="toast" />
    </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
    name: 'TheToaster',

    components: {
        UiToast,
    },

    props: {
        toastList: {
            type: Set,
            default: () => [],
        },
    },

    methods: {},
};
</script>

<style scoped>
.toasts {
    position: fixed;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    white-space: pre-wrap;
    z-index: 999;
}

@media all and (min-width: 992px) {
    .toasts {
        bottom: 72px;
        right: 112px;
    }
}
</style>
