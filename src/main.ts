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

// intercept responses
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		// server error
		if (!error.response) {
			console.log(error.response);
			return Promise.reject(error);
		}

		// handle specific responses
		switch (error.response.status) {
			case 401: // authentication error, logout the user
				console.error(error.response.status, error.message);
				store.dispatch('AppStore/logout');
				router.push('/login');
				break;

			default:
				console.error(error.response.status, error.message);
		}

		return Promise.reject(error);
	}
);

// Font Awesome icons
app.component('fa-icon', FontAwesomeIcon);

// v-tooltip
app.directive('tooltip', VTooltip);

// Filters  (to be addressed from script as this.$filters)
app.config.globalProperties.$filters = filters;

// Finally, mount the app!
app.mount('#app');
