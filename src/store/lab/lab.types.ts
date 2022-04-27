export interface Lab {
	id: string;
	name: string;
	address: string;
	available: boolean;
}

export interface State {
	labs: Lab[];
	lab: Lab;
}

export interface Getters {
	labs: Lab[];
	lab: Lab;
}

export type Actions = {
	fetchLabs: () => Promise<void>;
	fetchLab: (id: number) => Promise<void>;
	resetState: () => Promise<void>;
};
