import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Sample, State } from '@/store/sample/sample.types';
import axios from '@/services/axios';
import { ResponseDataWrapper } from '@/types/response.type';
import { handleErrors } from '@/mixins/ErrorHandler.mixin';

const SET_SAMPLES = 'set_samples';
const SET_SAMPLE = 'set_sample';
const ADD_SAMPLE = 'add_sample';
const UPDATE_SAMPLE = 'update_sample';
const DELETE_SAMPLE = 'delete_sample';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	samples(state: State) {
		return state.samples;
	},
	sample(state: State) {
		return state.sample;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchSamples({ commit, dispatch }) {
		return axios
			.get<ResponseDataWrapper<Sample[]>>('/api/samples/')
			.then(response => response.data)
			.then(response => {
				commit(SET_SAMPLES, response.data);
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
	fetchSample({ commit, dispatch }, id) {
		return axios
			.get<ResponseDataWrapper<Sample>>(`/api/samples/${id}`)
			.then(response => response.data)
			.then(response => {
				commit(SET_SAMPLE, response.data);
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
	saveSample({ commit, dispatch }, sample) {
		return axios
			.post<ResponseDataWrapper<Sample>>(`/api/samples/`, {
				name: sample.name,
				amount: sample.amount,
				note: sample.note,
				user: sample.user.id,
				grant: sample.grant?.id ?? ''
			})
			.then(response => response.data)
			.then(response => {
				commit(ADD_SAMPLE, response.data);
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
	updateSample({ commit, dispatch }, { id, sample }) {
		return axios
			.put<ResponseDataWrapper<Sample>>(`/api/samples/${id}`, {
				name: sample.name,
				note: sample.note,
				amount: sample.amount,
				user: sample.user.id,
				grant: sample.grant?.id ?? ''
			})
			.then(response => response.data)
			.then(response => {
				commit(UPDATE_SAMPLE, { id, sample: response.data });
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
	deleteSample({ commit, dispatch }, id) {
		return axios
			.delete<void>(`/api/samples/${id}`)
			.then(() => {
				commit(DELETE_SAMPLE, id);
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
		samples: [],
		sample: null!
	},
	getters,
	mutations: {
		[SET_SAMPLES](state, payload) {
			state.samples = payload;
		},
		[SET_SAMPLE](state, payload) {
			state.sample = payload;
		},
		[ADD_SAMPLE](state, payload) {
			state.samples = [...state.samples, payload];
		},
		[UPDATE_SAMPLE](state, payload) {
			state.samples = state.samples.map(sample =>
				payload.id === sample.id ? payload.sample : sample
			);
		},
		[DELETE_SAMPLE](state, id) {
			state.samples = state.samples.filter(sample => sample.id !== id);
		},
		[RESET_STATE](state) {
			state.samples = [];
		}
	},
	actions
};
