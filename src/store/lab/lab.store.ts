import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Lab, State } from '@/store/lab/lab.types';
import axios from '@/services/axios';
import { ResponseDataWrapper } from '@/types/response.type';

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
		return axios
			.get<ResponseDataWrapper<Lab[]>>('/api/labs/')
			.then(response => response.data)
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
		return axios
			.get<ResponseDataWrapper<Lab>>(`/api/labs/${id}`)
			.then(response => response.data)
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
		console.log('Lab: ', lab);
		return axios
			.post<ResponseDataWrapper<Lab>>(`/api/labs/`, lab)
			.then(response => response.data)
			.then(response => {
				console.log('Response: ', response);
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
		return axios
			.put<ResponseDataWrapper<Lab>>(`/api/labs/${id}`, {
				name: lab.name,
				address: lab.address
			})
			.then(response => response.data)
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
		return axios
			.delete<ResponseDataWrapper<Lab>>(`/api/labs/${id}`)
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
