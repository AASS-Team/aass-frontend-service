import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Lab, State } from '@/store/lab/lab.types';

const SET_LABS = 'set_labs';
const SET_LAB = 'set_lab';
const ADD_LAB = 'add_lab';
const UPDATE_LAB = 'update_lab';
const DELETE_LAB = 'delete_lab';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	labs(state: State) {
		return state.labs;
	},
	lab(state: State) {
		return state.lab;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchLabs({ commit, dispatch }) {
		return new Promise<{ data: Lab[] }>(resolve => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: '13ab4987-913e-4e4f-9aec-5f2c8cd1619e',
							name: 'A211',
							address: 'Radlinského 9, 812 37 Bratislava',
							available: true
						},
						{
							id: '2cfdcd14-4e80-4dc3-9c1f-39181802378d',
							name: 'A212',
							address: 'Radlinského 9, 812 37 Bratislava',
							available: true
						},
						{
							id: '431406e8-fbbd-4b54-a5cd-01173f681580',
							name: 'A213',
							address: 'Radlinského 9, 812 37 Bratislava',
							available: false
						},
						{
							id: '47edc17c-f2b1-4462-8285-964e22bd8949',
							name: 'A214',
							address: 'Radlinského 9, 812 37 Bratislava',
							available: false
						},
						{
							id: '7f62216a-9a82-420a-a6b6-0bb3a28685b6',
							name: 'A215',
							address: 'Radlinského 9, 812 37 Bratislava',
							available: true
						}
					]
				});
			}, 750);
		})
			.then(response => {
				commit(SET_LABS, response.data);
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
	fetchLab({ commit, dispatch }, id) {
		return new Promise<{ data: Lab }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: id,
						name: 'A211',
						address: 'Radlinského 9, 812 37 Bratislava',
						available: true
					}
				});
			}, 750);
		})
			.then(response => {
				commit(SET_LAB, response.data);
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
	saveLab({ commit, dispatch }, lab) {
		return new Promise<{ data: Lab }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: Math.random().toString(),
						name: lab.name,
						address: lab.address,
						available: true
					}
				});
			}, 750);
		})
			.then(response => {
				commit(ADD_LAB, response.data);
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
	updateLab({ commit, dispatch }, { id, lab }) {
		return new Promise<{ data: Lab }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: id,
						name: lab.name,
						address: lab.address,
						available: true
					}
				});
			}, 750);
		})
			.then(response => {
				commit(UPDATE_LAB, { id, lab: response.data });
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
	deleteLab({ commit, dispatch }, id) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 750);
		})
			.then(() => {
				commit(DELETE_LAB, id);
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
		labs: [],
		lab: null!
	},
	getters,
	mutations: {
		[SET_LABS](state, payload) {
			state.labs = payload;
		},
		[SET_LAB](state, payload) {
			state.lab = payload;
		},
		[ADD_LAB](state, payload) {
			state.labs = [...state.labs, payload];
		},
		[UPDATE_LAB](state, payload) {
			state.labs = state.labs.map(lab =>
				payload.id === lab.id ? payload.lab : lab
			);
		},
		[DELETE_LAB](state, id) {
			state.labs = state.labs.filter(lab => lab.id !== id);
		},
		[RESET_STATE](state) {
			state.labs = [];
		}
	},
	actions
};
