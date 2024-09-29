import VueCookies from 'vue-cookies';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueCookies);
});