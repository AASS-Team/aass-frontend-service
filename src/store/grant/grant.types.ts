export interface Grant {
	id: string;
	name: string;
}

export interface State {
	grants: Grant[];
	grant: Grant;
}

export interface Getters {
	grants: Grant[];
	grant: Grant;
}

export type Actions = {
	fetchGrants: () => Promise<void>;
	fetchGrant: (id: string) => Promise<void>;
	saveGrant: (grant: Grant) => Promise<void>;
	updateGrant: (payload: { id: string; grant: Grant }) => Promise<void>;
	deleteGrant: (id: string) => Promise<void>;
	resetState: () => Promise<void>;
};
