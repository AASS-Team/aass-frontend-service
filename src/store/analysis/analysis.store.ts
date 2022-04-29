import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import {
	Actions,
	Getters,
	Analysis,
	State
} from '@/store/analysis/analysis.types';
import { AnalysisStatus } from '@/types/analysis-status.enum';

const SET_ANALYSES = 'set_analyses';
const SET_ANALYSIS = 'set_analysis';
const ADD_ANALYSIS = 'add_analysis';
const UPDATE_ANALYSIS = 'update_analysis';
const DELETE_ANALYSIS = 'delete_analysis';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	analyses(state: State) {
		return state.analyses;
	},
	analysis(state: State) {
		return state.analysis;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchAnalyses({ commit, dispatch }) {
		return new Promise<{ data: Analysis[] }>(resolve => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: '01b7f288-4311-4c62-8a24-8aeea22b0054',
							sample: {
								id: '044f00a8-d337-45c3-b90e-a602016b59c6',
								name: 'Vzorka #323',
								note: '',
								amount: 15.0,
								created_at: '2022-04-13T00:39:40.341Z',
								user: {
									id: '123',
									first_name: 'Martin',
									last_name: 'Jahoda',
									email: 'Martin.jahoda@gmail.com'
								},
								grant: {
									id: '123',
									name: 'nbu'
								}
							},
							laborant: {
								id: 'f7d9caf4-9101-4fe5-859a-f286272640a3',
								first_name: 'Nikoleta',
								last_name: 'Hroncova',
								email: 'nikoleta@gmail.com'
							},
							lab: {
								id: '431406e8-fbbd-4b54-a5cd-01173f681580',
								name: 'A211',
								address: 'Radlinského 9, 812 37 Bratislava',
								available: true
							},
							status: AnalysisStatus.PENDING,
							structure: null,
							created_at: '2022-04-13T02:14:11.365Z',
							started_at: null,
							ended_at: null,
							tools: [
								{
									id: '13ab4987-913e-4e4f-9aec-5f2c8cd1619e',
									name: 'Spektrometer DS213',
									type: 'machine',
									available: true
								},
								{
									id: '2cfdcd14-4e80-4dc3-9c1f-39181802378d',
									name: 'Pipeta veľká',
									type: 'tool',
									available: true
								}
							]
						}
					]
				});
			}, 750);
		})
			.then(response => {
				commit(SET_ANALYSES, response.data);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: e.response?.data?.error
							? e.response.data.error
							: e.message,
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	fetchAnalysis({ commit, dispatch }, id) {
		return new Promise<{ data: Analysis }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: '01b7f288-4311-4c62-8a24-8aeea22b0054',
						sample: {
							id: '044f00a8-d337-45c3-b90e-a602016b59c6',
							name: 'Vzorka #323',
							note: '',
							amount: 15.0,
							created_at: '2022-04-13T00:39:40.341Z',
							user: {
								id: '123',
								first_name: 'Martin',
								last_name: 'Jahoda',
								email: 'Martin.jahoda@gmail.com'
							},
							grant: {
								id: '123',
								name: 'nbu'
							}
						},
						laborant: {
							id: 'f7d9caf4-9101-4fe5-859a-f286272640a3',
							first_name: 'Nikoleta',
							last_name: 'Hroncova',
							email: 'nikoleta@gmail.com'
						},
						lab: {
							id: '431406e8-fbbd-4b54-a5cd-01173f681580',
							name: 'A211',
							address: 'Radlinského 9, 812 37 Bratislava',
							available: true
						},
						status: AnalysisStatus.PENDING,
						structure: null,
						created_at: '2022-04-13T02:14:11.365Z',
						started_at: null,
						ended_at: null,
						tools: [
							{
								id: '13ab4987-913e-4e4f-9aec-5f2c8cd1619e',
								name: 'Spektrometer DS213',
								type: 'machine',
								available: true
							},
							{
								id: '2cfdcd14-4e80-4dc3-9c1f-39181802378d',
								name: 'Pipeta veľká',
								type: 'tool',
								available: true
							}
						]
					}
				});
			}, 750);
		})
			.then(response => {
				commit(SET_ANALYSIS, response.data);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: e.response?.data?.error
							? e.response.data.error
							: e.message,
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	saveAnalysis({ commit, dispatch }, analysis) {
		return new Promise<{ data: Analysis }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: Math.random().toString(),
						sample: analysis.sample,
						laborant: analysis.laborant,
						lab: analysis.lab,
						status: analysis.status,
						structure: analysis.structure,
						created_at: analysis.created_at,
						started_at: analysis.started_at,
						ended_at: analysis.ended_at,
						tools: analysis.tools
					}
				});
			}, 750);
		})
			.then(response => {
				commit(ADD_ANALYSIS, response.data);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: e.response?.data?.error
							? e.response.data.error
							: e.message,
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	updateAnalysis({ commit, dispatch }, { id, analysis }) {
		return new Promise<{ data: Analysis }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: id,
						sample: analysis.sample,
						laborant: analysis.laborant,
						lab: analysis.lab,
						status: analysis.status,
						structure: analysis.structure,
						created_at: analysis.created_at,
						started_at: analysis.started_at,
						ended_at: analysis.ended_at,
						tools: analysis.tools
					}
				});
			}, 750);
		})
			.then(response => {
				commit(UPDATE_ANALYSIS, { id, analysis: response.data });
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: e.response?.data?.error
							? e.response.data.error
							: e.message,
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	deleteAnalysis({ commit, dispatch }, id) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 750);
		})
			.then(() => {
				commit(DELETE_ANALYSIS, id);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: e.response?.data?.error
							? e.response.data.error
							: e.message,
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	async resetState({ commit }) {
		commit(RESET_STATE);
	}
};

export const store: Module<State, RootState> = {
	namespaced: true,
	state: {
		analyses: [],
		analysis: null!
	},
	getters,
	mutations: {
		[SET_ANALYSES](state, payload) {
			state.analyses = payload;
		},
		[SET_ANALYSIS](state, payload) {
			state.analysis = payload;
		},
		[ADD_ANALYSIS](state, payload) {
			state.analyses = [...state.analyses, payload];
		},
		[UPDATE_ANALYSIS](state, payload) {
			state.analyses = state.analyses.map(analysis =>
				payload.id === analysis.id ? payload.analysis : analysis
			);
		},
		[DELETE_ANALYSIS](state, id) {
			state.analyses = state.analyses.filter(
				analysis => analysis.id !== id
			);
		},
		[RESET_STATE](state) {
			state.analyses = [];
		}
	},
	actions
};
