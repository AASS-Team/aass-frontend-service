export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface State {
	users: User[];
	user: User;
}

export interface Getters {
    users: User[];
    user: User;
}

export type Actions = {
    fetchUsers: () => Promise<void>;
    fetchUser: (id: string) => Promise<void>;
    saveUser: (sample: User) => Promise<void>;
    updateUser: (payload: { id: string; user: User }) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    resetState: () => Promise<void>;
};