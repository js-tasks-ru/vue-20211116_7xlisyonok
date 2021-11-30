<template>
    <UiToaster :toastList="toastListVisible" />
</template>

<script>
import UiToaster from './UiToaster.vue';
import { toasterDefaultTimeout } from '../meetupService.js';

export default {
    name: 'TheToaster',

    components: {
        UiToaster,
    },

    data() {
        return {
            toastList: [],
        };
    },

    computed: {
        toastListVisible() {
            return this.toastList.filter((e) => e.visible);
        },
    },

    methods: {
        create(text, type, timeout) {
            const toastIndex = this.toastList.length;

            const newToast = {
                text: text,
                type: type,
                id: this.toastList.length,
                visible: false,
                timeoutIndex: null,
            };

            this.toastList.push(newToast);
            this.show(toastIndex, timeout);
            this.setTimeout(toastIndex, timeout);

            return toastIndex;
        },

        hide(index) {
            const toast = this.getToast(index);
            toast.visible = false;
        },

        show(index) {
            const toast = this.getToast(index);
            toast.visible = true;
        },

        setTimeout(index, timeout) {
            timeout = timeout || toasterDefaultTimeout;
            if (timeout > 0) {
                const toast = this.getToast(index);
                if (toast) {
                    clearTimeout(toast.timeoutIndex);
                    toast.timeoutIndex = setTimeout(() => this.hide(index), timeout);
                }
            }
        },

        getToast(index) {
            if (index < 0 || index > this.toastList.length) {
                throw new Error('index out of toastList');
            }
            return this.toastList[index];
        },

        success(text, timeout) {
            this.create(text, 'success', timeout);
        },

        error(text, timeout) {
            this.create(text, 'error', timeout);
        },
    },
};
</script>
