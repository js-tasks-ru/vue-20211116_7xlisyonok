<template>
    <UiToaster :toastList="toastList" />
</template>

<script>
import UiToaster from './UiToaster.vue';

/**
 * Значение таймаута по умолчанию для TheToaster
 */
const toasterDefaultTimeout = 5000;

export default {
    name: 'TheToaster',

    components: {
        UiToaster,
    },

    data() {
        return {
            toastList: new Set(),
        };
    },

    beforeMount() {
        this._nextToastIndex = 0;
    },

    beforeUnmount() {
        this.toastList.forEach(this.clearTimeout);
    },

    methods: {
        createToast(text, type, timeout) {
            const toastIndex = this._nextToastIndex++;

            const newToast = {
                text: text,
                type: type,
                id: toastIndex,
                timeoutIndex: null,
            };

            this.toastList.add(newToast);
            this.setTimeout(newToast, timeout);
        },

        setTimeout(toast, timeout) {
            timeout = timeout || toasterDefaultTimeout;
            if (timeout > 0) {
                clearTimeout(toast.timeoutIndex);
                toast.timeoutIndex = setTimeout(() => this.toastList.delete(toast), timeout);
            }
        },

        clearTimeout(toast) {
            if (toast.timeoutIndex) clearTimeout(toast.timeoutIndex);
            toast.timeoutIndex = null;
        },

        success(text, timeout) {
            this.createToast(text, 'success', timeout);
        },

        error(text, timeout) {
            this.createToast(text, 'error', timeout);
        },
    },
};
</script>
