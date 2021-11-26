import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
    name: 'PageMeetup',

    components: {
        UiAlert,
        UiContainer,
        MeetupView,
    },

    props: {
        meetupId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            state: 'loading', // loading | view | error
            error: null,
            meetup: null,
        };
    },

    watch: {
        meetupId: {
            immediate: true,
            handler(newVal) {
                this.clear();
                fetchMeetupById(newVal).then(this.setMeetup, this.setError);
            },
        },
    },

    methods: {
        setMeetup(meetup) {
            this.meetup = meetup;
            this.state = 'view';
        },
        setError(error) {
            this.state = 'error';
            this.error = error;
        },
        clear() {
            this.state = 'loading';
            this.error = null;
            this.meetup = null;
        },
    },

    template: `
        <div class="page-meetup">
            <meetup-view 
                v-if="state === 'view'" 
                :meetup = "meetup"
            />

            <ui-container v-else-if="state === 'loading'">
                <ui-alert>Загрузка...</ui-alert>
            </ui-container>

            <ui-container v-else-if="state === 'error'">
                <ui-alert>{{ error.message }}</ui-alert>
            </ui-container>
        </div>`,
});