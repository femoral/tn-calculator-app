import App from './App.vue';
import { createApp } from 'vue';
import vuetify from '@/plugins/vuetify';
import { router } from '@/router';
import { createPinia } from 'pinia';
import { errorHandler } from '@/error.handler';

const pinia = createPinia();
const app = createApp(App);
app.config.errorHandler = errorHandler;
window.addEventListener('unhandledrejection', (event) =>
  errorHandler(event.reason)
);

app.use(pinia).use(vuetify).use(router);

router.isReady().then(() => {
  app.mount('#app');
});
