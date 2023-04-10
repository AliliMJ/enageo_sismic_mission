import { createApp } from 'vue';
import router from 'router/routes';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import './styles.css';
import { Role } from './enums';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);

app.mount('#app');
