import { createApp } from './vendor/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        incCount() {
            this.count++;
        },
    },
});

const vm = app.mount('#app');
