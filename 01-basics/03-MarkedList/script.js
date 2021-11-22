import { createApp } from './vendor/vue.esm-browser.js';

// From https://jsonplaceholder.typicode.com/comments
const emails = [
    'Eliseo@gardner.biz',
    'Jayne_Kuhic@sydney.com',
    'Nikita@garfield.biz',
    'Lew@alysha.tv',
    'Hayden@althea.biz',
    'Presley.Mueller@myrl.com',
    'Dallas@ole.me',
    'Mallory_Kunze@marie.org',
    'Meghan_Littel@rene.us',
    'Carmen_Keeling@caroline.name',
    'Veronica_Goodwin@timmothy.net',
    'Oswald.Vandervort@leanne.org',
    'Kariane@jadyn.tv',
    'Nathan@solon.io',
    'Maynard.Hodkiewicz@roberta.com',
    'Christine@ayana.info',
    'Preston_Hudson@blaise.tv',
    'Vincenza_Klocko@albertha.name',
    'Madelynn.Gorczany@darion.biz',
    'Mariana_Orn@preston.org',
    'Noemie@marques.me',
    'Khalil@emile.co.uk',
    'Sophia@arianna.co.uk',
    'Jeffery@juwan.us',
    'Isaias_Kuhic@jarrett.net',
];

const app = createApp({
    data() {
        return {
            emails: emails,
            filters: {
                template: '',
            },
        };
    },
    computed: {
        markedEmails() {
            const getMarked = (email) => {
                const templateLower = this.filters.template.toLowerCase();
                const emailLower = email.toLowerCase();

                let isMarked = false;
                if (templateLower) {
                    isMarked = emailLower.indexOf(templateLower) != -1;
                }

                return {
                    value: email,
                    isMarked,
                };
            };
            return this.emails.map((email) => getMarked(email));
        },
    },
});

const vm = app.mount('#app');
