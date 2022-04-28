import {User} from "@/store/user/user.types";

export interface Sample {
	id: string;
	name: string;
	note: string;
	amount: number;
	user: User;
	created_at: string;
}

export interface State {
	samples: Sample[];
	sample: Sample;
}

export interface Getters {
	samples: Sample[];
	sample: Sample;
}

export type Actions = {
	fetchSamples: () => Promise<void>;
	fetchSample: (id: string) => Promise<void>;
	saveSample: (sample: Sample) => Promise<void>;
	updateSample: (payload: { id: string; sample: Sample }) => Promise<void>;
	deleteSample: (id: string) => Promise<void>;
	resetState: () => Promise<void>;
};
