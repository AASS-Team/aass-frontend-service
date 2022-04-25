import { Module } from 'vuex';
import { Actions, Getters, State } from '@/store/app/app.types';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';

const TOGGLE_NAVIGATION = 'toggle_navigation';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	navigation(state: State) {
		return state.navigation;
	},
	isNavigationCollapsed(state: State) {
		return state.navigationCollapsed;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	async toggleNavigation({ commit }) {
		await new Promise<void>(resolve => {
			return setTimeout(() => {
				commit(TOGGLE_NAVIGATION);
				resolve();
			});
		});
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
		]
	},
	getters,
	mutations: {
		[TOGGLE_NAVIGATION](state) {
			state.navigationCollapsed = !state.navigationCollapsed;
		}
	},
	actions
};
