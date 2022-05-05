export interface User {
	id: string;
	name?: string;
	first_name: string;
	last_name: string;
	email: string;
	password?: string;
	groups?: UserGroup[];
}

export interface UserGroup {
	id: number;
	name: string;
}

export interface State {
	users: User[];
	user: User;
	groups: UserGroup[];
}

export interface Getters {
	users: User[];
	user: User;
	groups: UserGroup[];
}

export type Actions = {
	fetchUsers: () => Promise<void>;
	fetchUser: (id: string) => Promise<void>;
	saveUser: (sample: User) => Promise<void>;
	updateUser: (payload: { id: string; user: User }) => Promise<void>;
	deleteUser: (id: string) => Promise<void>;
	fetchGroups: () => Promise<void>;
	resetState: () => Promise<void>;
};
