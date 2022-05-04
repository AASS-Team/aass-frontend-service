import { createApp } from 'vue';
import router from './router';
import { RouterView } from 'vue-router';
import store from './store';
import axios from './services/axios';

// Root styles
import '@/assets/scss/app.scss';

// Local dependencies
import FontAwesomeIcon from '@/icons';
import filters from '@/filters';

// Third party global dependencies
import { VTooltip } from 'floating-vue';

// Create Vue app
const app = createApp(RouterView);

// Vuex
app.use(store);

// Vue-router
app.use(router);

// Make axios available in component & store scope
app.config.globalProperties.$axios = axios;

// Font Awesome icons
app.component('fa-icon', FontAwesomeIcon);

// v-tooltip
app.directive('tooltip', VTooltip);

// Filters  (to be addressed from script as this.$filters)
app.config.globalProperties.$filters = filters;

// Finally, mount the app!
app.mount('#app');
