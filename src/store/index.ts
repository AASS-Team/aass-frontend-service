import { createStore } from 'vuex';
import { store as AppStore } from '@/store/app/app.store';
import { store as LabStore } from '@/store/lab/lab.store';

export default createStore({
	modules: {
		AppStore,
		LabStore
	}
});
