import { createStore } from 'vuex';
import { store as AppStore } from '@/store/app/app.store';

export default createStore({
	modules: {
		AppStore
	}
});
