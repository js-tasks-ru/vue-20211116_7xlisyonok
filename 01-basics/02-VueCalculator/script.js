import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            value1: 0,
            value2: 0,
            operation: 'sum', // sum subtract multiply divide
        };
    },
    computed: {
        calcResult() {
            const value1 = this.value1;
            const value2 = this.value2;
            switch (this.operation) {
                case 'sum':
                    return value1 + value2;
                case 'subtract':
                    return value1 - value2;
                case 'multiply':
                    return value1 * value2;
                case 'divide':
                    return value1 / value2;
                default:
                    return null;
            }
        },
    },
});

const vm = app.mount('#app');
