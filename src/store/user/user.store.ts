import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import {
	Actions,
	Getters,
	User,
	State,
	UserGroup
} from '@/store/user/user.types';
import axios from '@/services/axios';
import { ResponseDataWrapper } from '@/types/response.type';
import { handleErrors } from '@/mixins/ErrorHandler.mixin';

const SET_USERS = 'set_users';
const SET_USER = 'set_user';
const ADD_USER = 'add_user';
const UPDATE_USER = 'update_user';
const DELETE_USER = 'delete_user';
const SET_GROUPS = 'set_groups';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	users(state: State) {
		return state.users;
	},
	user(state: State) {
		return state.user;
	},
	groups(state: State) {
		return state.groups;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchUsers({ commit, dispatch }) {
		return axios
			.get<ResponseDataWrapper<User[]>>('/api/users/')
			.then(response => response.data)
			.then(response => {
				commit(SET_USERS, response.data);
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
	fetchUser({ commit, dispatch }, id) {
		return axios
			.get<ResponseDataWrapper<User>>(`/api/users/${id}`)
			.then(response => response.data)
			.then(response => {
				commit(SET_USER, response.data);
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
	saveUser({ commit, dispatch }, user) {
		return axios
			.post<ResponseDataWrapper<User>>(`/api/users/`, {
				...user,
				groups: (user.groups ?? []).map(g => g.id)
			})
			.then(response => response.data)
			.then(response => {
				commit(ADD_USER, response.data);
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
	updateUser({ commit, dispatch }, { id, user }) {
		return axios
			.put<ResponseDataWrapper<User>>(`/api/users/${id}`, {
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				groups: (user.groups ?? []).map(g => g.id)
			})
			.then(response => {
				commit(UPDATE_USER, { id, user: response.data });
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
	deleteUser({ commit, dispatch }, id) {
		return axios
			.delete<ResponseDataWrapper<User>>(`/api/users/${id}`)
			.then(() => {
				commit(DELETE_USER, id);
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
	fetchGroups({ commit, dispatch }) {
		return axios
			.get<ResponseDataWrapper<UserGroup[]>>('/api/groups/')
			.then(response => response.data)
			.then(response => {
				commit(SET_GROUPS, response.data);
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
		users: [],
		user: null!,
		groups: []
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
		[SET_GROUPS](state, payload) {
			state.groups = payload;
		},
		[RESET_STATE](state) {
			state.users = [];
		}
	},
	actions
};
