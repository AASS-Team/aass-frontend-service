/*
 * Takes any FunctionTree and adds an ActionContext as first parameter of each function, to make a
 * valid ActionTree type.
 * Source: https://github.com/thousandeyes/vue2-vuex-typescript/blob/master/src/util.ts
 */
import { ActionContext, ActionMethod } from 'vuex';

export type GetterTreeAdaptor<Type, State, RootState> = {
	[Key in keyof Type]: (
		state: State,
		getters: unknown,
		rootState: RootState,
		rootGetters: unknown
	) => Type[Key];
};

export type ActionTreeAdaptor<
	Type extends Record<string, ActionMethod>,
	State,
	RootState
> = {
	[Key in keyof Type]: (
		a: ActionContext<State, RootState>,
		...p: Parameters<Type[Key]>
	) => ReturnType<Type[Key]>;
};

export type RootState = Record<string, unknown>;
