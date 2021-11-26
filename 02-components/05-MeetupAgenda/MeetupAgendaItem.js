import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';
//console.log(agendaItemIcons);

export default defineComponent({
    name: 'MeetupAgendaItem',

    props: {
        agendaItem: {
            type: Object,
            required: true,
        },
    },

    computed: {
        titleDefault() {
            return agendaItemDefaultTitles[this.agendaItem.type];
        },

        title() {
            return this.agendaItem.title || this.titleDefault;
        },

        iconKey() {
            return agendaItemIcons[this.agendaItem.type];
        },

        iconSrc() {
            return `/assets/icons/icon-${this.iconKey}.svg`;
        },
    },

    template: `
        <div class="agenda-item">
            <div class="agenda-item__col">
                <img :src="iconSrc" class="icon" alt="key" />
            </div>
            <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
            <div class="agenda-item__col">
                <h3 class="agenda-item__title">{{ title }}</h3>
                <p class="agenda-item__talk" v-if="agendaItem.type === 'talk'">
                    <span>{{ agendaItem.speaker }}</span>
                    <span class="agenda-item__dot"></span>
                    <span class="agenda-item__lang">{{ agendaItem.language }}</span>
                </p>
                <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
            </div>
        </div>`,
});
