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
import { handleErrors } from '@/mixins/ErrorHandler.mixin';
import axios from '@/services/axios';
import { ResponseDataWrapper } from '@/types/response.type';

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
		return axios
			.get<ResponseDataWrapper<Analysis[]>>('/api/analyses/')
			.then(response => response.data)
			.then(response => {
				commit(SET_ANALYSES, response.data);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	fetchAnalysis({ commit, dispatch }, id) {
		return axios
			.get<ResponseDataWrapper<Analysis>>(`/api/analyses/${id}`)
			.then(response => response.data)
			.then(response => {
				commit(SET_ANALYSIS, response.data);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	saveAnalysis({ commit, dispatch }, analysis) {
		return axios
			.post<ResponseDataWrapper<Analysis>>(`/api/analyses/`, {
				lab: analysis.lab.id,
				laborant: analysis.laborant.id,
				sample: analysis.sample.id,
				tools: analysis.tools.map(t => t.id)
			})
			.then(response => response.data)
			.then(response => {
				commit(ADD_ANALYSIS, response.data);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	updateAnalysis({ commit, dispatch }, { id, analysis }) {
		return axios
			.put<ResponseDataWrapper<Analysis>>(`/api/analyses/${id}`, {
				status: analysis.status,
				structure: analysis.structure,
				lab: analysis.lab.id,
				sample: analysis.sample.id,
				laborant: analysis.laborant?.id ?? null,
				tools: analysis.tools.map(t => t.id),
				created_at: analysis.created_at,
				ended_at: analysis.ended_at
			})
			.then(response => response.data)
			.then(response => {
				commit(UPDATE_ANALYSIS, { id, analysis: response.data });
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	deleteAnalysis({ commit, dispatch }, id) {
		return axios
			.delete<void>(`/api/analyses/${id}`)
			.then(() => {
				commit(DELETE_ANALYSIS, id);
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	startAnalysis({ commit, dispatch }, id) {
		return axios
			.post<ResponseDataWrapper<Analysis>>(`/api/analyses/${id}/start`)
			.then(response => response.data)
			.then(response => {
				commit(UPDATE_ANALYSIS, { id, analysis: response.data });
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
						type: 'error',
						duration: 0
					},
					{ root: true }
				);
			});
	},
	finishAnalysis({ commit, dispatch }, id) {
		return axios
			.post<ResponseDataWrapper<Analysis>>(`/api/analyses/${id}/finish`)
			.then(response => response.data)
			.then(response => {
				commit(UPDATE_ANALYSIS, { id, analysis: response.data });
			})
			.catch(e => {
				dispatch(
					'AppStore/setAlert',
					{
						message: handleErrors(e),
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
