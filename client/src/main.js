import { createApp } from 'vue';
import router from 'router/routes';
import App from './App.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia';
import './styles.css';
import { Role } from './enums';
import './dist/jquery/jquery.min.js';
import './dist/jquey-ui/jquery-ui.min.js';
import './dist/jquey-ui/jquery-ui.min.js';
import './dist/pivot/pivot.js';
import './dist/pivot/pivot.fr.min.js';
import './dist/pivot/pivot.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);

app.mount('#app');
