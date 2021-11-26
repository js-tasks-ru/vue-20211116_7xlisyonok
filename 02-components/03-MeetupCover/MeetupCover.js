import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
    name: 'MeetupCover',

    props: {
        title: {
            type: String,
            default: '',
        },

        image: {
            type: String,
        },
    },

    computed: {
        style() {
            return {
                '--bg-url': this.image && `url('${this.image}')`,
            };
        },
    },

    template: `
        <div class="meetup-cover" :style="style">
            <h1 class="meetup-cover__title">{{ title }}</h1>
        </div>`,
});
