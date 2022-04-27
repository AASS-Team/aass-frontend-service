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
	fetchLab: (id: string) => Promise<void>;
	saveLab: (lab: Lab) => Promise<void>;
	updateLab: (payload: { id: string; lab: Lab }) => Promise<void>;
	deleteLab: (id: string) => Promise<void>;
	resetState: () => Promise<void>;
};
