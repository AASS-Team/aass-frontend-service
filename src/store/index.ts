import { createStore } from 'vuex';
import { store as AppStore } from '@/store/app/app.store';
import { store as LabStore } from '@/store/lab/lab.store';
import { store as SampleStore } from '@/store/sample/sample.store';
import { store as ToolStore } from '@/store/tool/tool.store';
import { store as GrantStore } from '@/store/grant/grant.store';
import { store as AnalysisStore } from '@/store/analysis/analysis.store'
import { store as UserStore } from '@/store/user/user.store'

export default createStore({
	modules: {
		AppStore,
		LabStore,
		SampleStore,
		ToolStore,
		GrantStore,
		AnalysisStore,
		UserStore
	}
});
