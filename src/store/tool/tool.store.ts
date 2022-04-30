import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Tool, State } from '@/store/tool/tool.types';

const SET_TOOLS = 'set_tools';
const SET_TOOL = 'set_tool';
const ADD_TOOL = 'add_tool';
const UPDATE_TOOL = 'update_tool';
const DELETE_TOOL = 'delete_tool';
const RESET_STATE = 'reset_state';

const getters: GetterTreeAdaptor<Getters, State, RootState> = {
	tools(state: State) {
		return state.tools;
	},
	tool(state: State) {
		return state.tool;
	}
};

const actions: ActionTreeAdaptor<Actions, State, RootState> = {
	fetchTools({ commit, dispatch }) {
		return new Promise<{ data: Tool[] }>(resolve => {
			setTimeout(() => {
				resolve({
					data: [
						{
							id: '13ab4987-913e-4e4f-9aec-5f2c8cd1619e',
							name: 'Spektrometer DS213',
							type: 'machine',
							available: true
						},
						{
							id: '2cfdcd14-4e80-4dc3-9c1f-39181802378d',
							name: 'Pipeta veľká',
							type: 'tool',
							available: true
						},
						{
							id: '431406e8-fbbd-4b54-a5cd-01173f681580',
							name: 'Sekvenátor Medirex MX2',
							type: 'machine',
							available: false
						},
						{
							id: '47edc17c-f2b1-4462-8285-964e22bd8949',
							name: 'Pipeta veľká',
							type: 'tool',
							available: false
						},
						{
							id: '7f62216a-9a82-420a-a6b6-0bb3a28685b6',
							name: 'Centrifúga SRT HEMI',
							type: 'machine',
							available: true
						}
					]
				});
			}, 750);
		})
			.then(response => {
				commit(SET_TOOLS, response.data);
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
	fetchTool({ commit, dispatch }, id) {
		return new Promise<{ data: Tool }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: id,
						name: 'Spektrometer DS213',
						type: 'machine',
						available: true
					}
				});
			}, 750);
		})
			.then(response => {
				commit(SET_TOOL, response.data);
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
	saveTool({ commit, dispatch }, tool) {
		return new Promise<{ data: Tool }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: Math.random().toString(),
						name: tool.name,
						type: tool.type,
						available: true
					}
				});
			}, 750);
		})
			.then(response => {
				commit(ADD_TOOL, response.data);
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
	updateTool({ commit, dispatch }, { id, tool }) {
		return new Promise<{ data: Tool }>(resolve => {
			setTimeout(() => {
				resolve({
					data: {
						id: id,
						name: tool.name,
						type: tool.type,
						available: true
					}
				});
			}, 750);
		})
			.then(response => {
				commit(UPDATE_TOOL, { id, tool: response.data });
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
	deleteTool({ commit, dispatch }, id) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(null);
			}, 750);
		})
			.then(() => {
				commit(DELETE_TOOL, id);
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
		tools: [],
		tool: null!
	},
	getters,
	mutations: {
		[SET_TOOLS](state, payload) {
			state.tools = payload;
		},
		[SET_TOOL](state, payload) {
			state.tool = payload;
		},
		[ADD_TOOL](state, payload) {
			state.tools = [...state.tools, payload];
		},
		[UPDATE_TOOL](state, payload) {
			state.tools = state.tools.map(tool =>
				payload.id === tool.id ? payload.tool : tool
			);
		},
		[DELETE_TOOL](state, id) {
			state.tools = state.tools.filter(tool => tool.id !== id);
		},
		[RESET_STATE](state) {
			state.tools = [];
		}
	},
	actions
};
