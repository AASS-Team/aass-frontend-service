import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Grant, State } from '@/store/grant/grant.types';
import axios from '@/services/axios';
import { ResponseDataWrapper } from '@/types/response.type';
import {Lab} from "@/store/lab/lab.types";

const SET_GRANTS = 'set_grants';
const SET_GRANT = 'set_grant';
const ADD_GRANT = 'add_grant';
const UPDATE_GRANT = 'update_grant';
const DELETE_GRANT = 'delete_grant';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	grants(state: State) {
		return state.grants;
	},
	grant(state: State) {
		return state.grant;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchGrants({ commit, dispatch }) {
		return axios
			.get<ResponseDataWrapper<Grant[]>>('/api/grants/')
			.then(response => response.data)
			.then(response => {
				commit(SET_GRANTS, response.data);
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
	fetchGrant({ commit, dispatch }, id) {
		return axios
			.get<ResponseDataWrapper<Grant>>(`/api/grants/${id}`)
			.then(response => response.data)
			.then(response => {
				commit(SET_GRANT, response.data);
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
	saveGrant({ commit, dispatch }, grant) {
		return axios
			.post<ResponseDataWrapper<Grant>>(`/api/grants/`, grant)
			.then(response => response.data)
			.then(response => {
				commit(ADD_GRANT, response.data);
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
	updateGrant({ commit, dispatch }, { id, grant }) {
		return axios
			.put<ResponseDataWrapper<Grant>>(`/api/grants/${id}`, {
				name: grant.name,
			})
			.then(response => response.data)
			.then(response => {
				commit(UPDATE_GRANT, { id, grant: response.data });
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
	deleteGrant({ commit, dispatch }, id) {
		return axios
			.delete<void>(`/api/grants/${id}`)
			.then(() => {
				commit(DELETE_GRANT, id);
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
		grants: [],
		grant: null!
	},
	getters,
	mutations: {
		[SET_GRANTS](state, payload) {
			state.grants = payload;
		},
		[SET_GRANT](state, payload) {
			state.grant = payload;
		},
		[ADD_GRANT](state, payload) {
			state.grants = [...state.grants, payload];
		},
		[UPDATE_GRANT](state, payload) {
			state.grants = state.grants.map(grant =>
				payload.id === grant.id ? payload.grant : grant
			);
		},
		[DELETE_GRANT](state, id) {
			state.grants = state.grants.filter(grant => grant.id !== id);
		},
		[RESET_STATE](state) {
			state.grants = [];
		}
	},
	actions
};
