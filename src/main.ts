import { createApp } from 'vue';
import router from './router';
import store from './store';

// Root styles
import '@/assets/scss/app.scss';

// Root component
import App from './App.vue';

// Local dependencies
import FontAwesomeIcon from '@/icons';
import filters from '@/filters';

// Third party global dependencies
import axios from 'axios';
import { VTooltip } from 'floating-vue';

// Create Vue app
const app = createApp(App);

// Vuex
app.use(store);

// Vue-router
app.use(router);

// Axios (to be addressed from script as this.$axios)
const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_URL
});

app.config.globalProperties.$axios = axiosInstance;

// Font Awesome icons
app.component('fa-icon', FontAwesomeIcon);

// v-tooltip
app.directive('tooltip', VTooltip);

// Filters  (to be addressed from script as this.$filters)
app.config.globalProperties.$filters = filters;

// Finally, mount the app!
app.mount('#app');
