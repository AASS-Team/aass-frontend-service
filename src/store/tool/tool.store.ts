import { Module } from 'vuex';
import {
	ActionTreeAdaptor,
	GetterTreeAdaptor,
	RootState
} from '@/store/index.types';
import { Actions, Getters, Tool, State } from '@/store/tool/tool.types';
import axios from '@/services/axios';
import { ResponseDataWrapper } from '@/types/response.type';
import { handleErrors } from '@/mixins/ErrorHandler.mixin';

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
		return axios
			.get<ResponseDataWrapper<Tool[]>>('/api/tools/')
			.then(response => response.data)
			.then(response => {
				commit(SET_TOOLS, response.data);
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
	fetchTool({ commit, dispatch }, id) {
		return axios
			.get<ResponseDataWrapper<Tool>>(`/api/tools/${id}`)
			.then(response => response.data)
			.then(response => {
				commit(SET_TOOL, response.data);
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
	saveTool({ commit, dispatch }, tool) {
		return axios
			.post<ResponseDataWrapper<Tool>>(`/api/tools/`, tool)
			.then(response => response.data)
			.then(response => {
				commit(ADD_TOOL, response.data);
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
	updateTool({ commit, dispatch }, { id, tool }) {
		return axios
			.put<ResponseDataWrapper<Tool>>(`/api/tools/${id}`, {
				name: tool.name,
				type: tool.type
			})
			.then(response => response.data)
			.then(response => {
				commit(UPDATE_TOOL, { id, tool: response.data });
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
	deleteTool({ commit, dispatch }, id) {
		return axios
			.delete<ResponseDataWrapper<Tool>>(`/api/tools/${id}`)
			.then(() => {
				commit(DELETE_TOOL, id);
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
