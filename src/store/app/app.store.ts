import { Module } from 'vuex';
import { Actions, AuthCredentials, Getters, State } from '@/store/app/app.types';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import axios from '@/services/axios';
import { handleErrors } from '@/mixins/ErrorHandler.mixin';
import { ResponseDataWrapper } from '@/types/response.type';

const TOGGLE_NAVIGATION = 'toggle_navigation';
const SET_ALERT_ACTIVE = 'set_alert_active';
const SET_ALERT = 'set_alert';
const LOGIN = 'login';
const LOGOUT = 'logout';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	navigation(state: State) {
		return state.navigation;
	},
	isNavigationCollapsed(state: State) {
		return state.navigationCollapsed;
	},
	alert(state) {
		return state.alert;
	},
	isAlertActive(state) {
		return state.alertActive;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	async toggleNavigation({ commit }) {
		commit(TOGGLE_NAVIGATION);
	},
	async setAlert({ commit }, payload) {
		commit(SET_ALERT, payload);
		commit(SET_ALERT_ACTIVE, true);
	},
	async dismissAlert({ commit }) {
		commit(SET_ALERT_ACTIVE, false);
	},
	async login({ commit, dispatch }, payload) {
		return axios
			.post<AuthCredentials, ResponseDataWrapper<{ token: string }>>('/api/login/', payload)
			.then(response => {
				// Set the token directly in Axios headers
				axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
				commit(LOGIN);
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
				throw handleErrors(e);
			});
	},
	async logout({ commit }) {
		commit(LOGOUT);
	}
};

export const store: Module<State, RootState> = {
	namespaced: true,
	state: {
		navigationCollapsed: false,
		navigation: [
			{
				title: '',
				items: [
					{
						path: '/samples',
						icon: ['fas', 'vial'],
						title: 'Vzorky'
					},
					{
						path: '/analyses',
						icon: ['fas', 'microscope'],
						title: 'Analýzy'
					},
					{
						path: '/grants',
						icon: ['fas', 'file-invoice-dollar'],
						title: 'Granty'
					}
				]
			},
			{
				title: 'Administrácia',
				items: [
					{
						path: '/users',
						icon: ['fas', 'user-friends'],
						title: 'Správa užívateľov'
					},
					{
						path: '/administration',
						icon: ['fas', 'tools'],
						title: 'Správa laboratórií'
					}
				]
			},
			{
				title: 'Účet',
				items: [
					{
						path: '/change-password',
						icon: ['fas', 'lock'],
						title: 'Zmena hesla'
					},
					{
						path: '/logout',
						icon: ['fas', 'sign-out-alt'],
						title: 'Odhlásiť sa'
					}
				]
			}
		],
		alertActive: false,
		alert: {
			message: '',
			type: null!,
			duration: 2500
		}
	},
	getters,
	mutations: {
		[TOGGLE_NAVIGATION](state) {
			state.navigationCollapsed = !state.navigationCollapsed;
		},
		[SET_ALERT_ACTIVE](state, active) {
			state.alertActive = active;
		},
		[SET_ALERT](state, alert) {
			state.alert = { duration: 2500, ...alert };
		},
		[LOGIN](state) {
		},
		[LOGOUT](state) {
		}
	},
	actions
};
