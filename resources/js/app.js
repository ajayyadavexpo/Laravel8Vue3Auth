require('./bootstrap');

import { createApp } from 'vue'
import VueCookie from 'vue-cookie'

import Root from './App.vue';

const app = createApp(Root)
app.use(VueCookie)

app.provide('cookies', app.config.globalProperties.$cookies)

app.mount("#app");

