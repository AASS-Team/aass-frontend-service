import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Grant, State } from '@/store/grant/grant.types';

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
		return new Promise<{ data: Grant[] }>(resolve => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: '13ab4987-913e-4e4f-9aec-5f2c8cd1619e',
							name: 'Dotácia z Európskej Únie'
						},
						{
							id: '2cfdcd14-4e80-4dc3-9c1f-39181802378d',
							name: 'Grant fondu FCHPT STU'
						},
						{
							id: '47edc17c-f2b1-4462-8285-964e22bd8949',
							name: 'Grant na výskum vedy a školstva'
						}
					]
				});
			}, 750);
		})
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
		return new Promise<{ data: Grant }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: '13ab4987-913e-4e4f-9aec-5f2c8cd1619e',
						name: 'Dotácia z Európskej Únie'
					}
				});
			}, 750);
		})
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
		return new Promise<{ data: Grant }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: Math.random().toString(),
						name: grant.name
					}
				});
			}, 750);
		})
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
		return new Promise<{ data: Grant }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: id,
						name: grant.name
					}
				});
			}, 750);
		})
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
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 750);
		})
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
