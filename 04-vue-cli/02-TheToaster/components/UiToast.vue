<template>
    <div class="toast" :class="toastClass">
        <ui-icon class="toast__icon" :icon="iconClass" />
        <span>{{ toast.text }}</span>
    </div>
</template>

<script>
import UiIcon from './UiIcon';

/**
 * Конфигурация иконок для тостера
 */
const toasterTypeConfig = {
    success: {
        iconClass: 'check-circle',
        toastClass: 'toast_success',
    },
    error: {
        iconClass: 'alert-circle',
        toastClass: 'toast_error',
    },
};

export default {
    name: 'UiToast',

    components: {
        UiIcon,
    },

    props: {
        toast: {
            type: Object,
            required: true,
            validator: (toast) => {
                return 'type' in toast && toast.type in toasterTypeConfig;
            },
        },
    },

    computed: {
        config() {
            return toasterTypeConfig[this.toast.type];
        },
        iconClass() {
            return this.config.iconClass;
        },
        toastClass() {
            return this.config.toastClass;
        },
    },
};
</script>

<style scoped>
.toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
}

.toast + .toast {
    margin-top: 20px;
}

.toast__icon {
    margin-right: 12px;
}

.toast.toast_success {
    color: var(--green);
}

.toast.toast_error {
    color: var(--red);
}
</style>
