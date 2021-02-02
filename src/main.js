import { createApp } from 'vue';
import store from './store';
import router from './router.js';
import App from './App';
const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');
