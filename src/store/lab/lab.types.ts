export interface Lab {
	id: string;
	name: string;
	address: string;
	available: boolean;
}

export interface State {
	labs: Lab[];
}

export interface Getters {
	labs: Lab[];
}

export type Actions = {
	fetchLabs: () => Promise<void>;
	resetState: () => Promise<void>;
};
