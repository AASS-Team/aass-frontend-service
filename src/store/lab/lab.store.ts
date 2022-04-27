import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, State } from '@/store/lab/lab.types';

const SET_LABS = 'set_labs';
const SET_LAB = 'set_lab';
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
	fetchLabs({ commit }) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 1500);
		}).then(() => {
			commit(SET_LABS, [
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
			]);
		});
	},
	fetchLab({ commit }, id) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 1500);
		}).then(() => {
			commit(SET_LAB, {
				id: id,
				name: 'A211',
				address: 'Radlinského 9, 812 37 Bratislava',
				available: true
			});
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
		[RESET_STATE](state) {
			state.labs = [];
		}
	},
	actions
};
