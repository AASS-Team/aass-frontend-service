import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, User, State } from '@/store/user/user.types';

const SET_USERS = 'set_users';
const SET_USER = 'set_user';
const ADD_USER = 'add_user';
const UPDATE_USER = 'update_user';
const DELETE_USER = 'delete_user';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	users(state: State) {
		return state.users;
	},
	user(state: State) {
		return state.user;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchUsers({ commit, dispatch }) {
		return new Promise<{ data: User[] }>(resolve => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: 'd845c72a-2108-4b76-9dc0-2c3f936873ad',
							first_name: 'Používateľka',
							last_name: 'Iná',
							email: 'user2@test.sk'
						},
						{
							id: '4386280d-00d4-4677-a2c5-a68c66ec6825',
							first_name: 'Používateľ',
							last_name: 'Použitý',
							email: 'user@test.sk'
						},
						{
							id: 'f7d9caf4-9101-4fe5-859a-f286272640a3',
							first_name: 'Laborant',
							last_name: 'Laboratórny',
							email: 'laborant@test.sk'
						}
					]
				});
			}, 750);
		})
			.then(response => {
				commit(SET_USERS, response.data);
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
	fetchUser({ commit, dispatch }, id) {
		return new Promise<{ data: User }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: 'd845c72a-2108-4b76-9dc0-2c3f936873ad',
						first_name: 'Používateľka',
						last_name: 'Iná',
						email: 'user2@test.sk'
					}
				});
			}, 750);
		})
			.then(response => {
				commit(SET_USER, response.data);
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
	saveUser({ commit, dispatch }, user) {
		return new Promise<{ data: User }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: 'd845c72a-2108-4b76-9dc0-2c3f936873ad',
						first_name: 'Používateľka',
						last_name: 'Iná',
						email: 'user2@test.sk'
					}
				});
			}, 750);
		})
			.then(response => {
				commit(ADD_USER, response.data);
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
	updateUser({ commit, dispatch }, { id, user }) {
		return new Promise<{ data: User }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: 'd845c72a-2108-4b76-9dc0-2c3f936873ad',
						first_name: 'Používateľka',
						last_name: 'Iná',
						email: 'user2@test.sk'
					}
				});
			}, 750);
		})
			.then(response => {
				commit(UPDATE_USER, { id, user: response.data });
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
	deleteUser({ commit, dispatch }, id) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 750);
		})
			.then(() => {
				commit(DELETE_USER, id);
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
		users: [],
		user: null!
	},
	getters,
	mutations: {
		[SET_USERS](state, payload) {
			state.users = payload;
		},
		[SET_USER](state, payload) {
			state.user = payload;
		},
		[ADD_USER](state, payload) {
			state.users = [...state.users, payload];
		},
		[UPDATE_USER](state, payload) {
			state.users = state.users.map(user =>
				payload.id === user.id ? payload.user : user
			);
		},
		[DELETE_USER](state, id) {
			state.users = state.users.filter(user => user.id !== id);
		},
		[RESET_STATE](state) {
			state.users = [];
		}
	},
	actions
};
