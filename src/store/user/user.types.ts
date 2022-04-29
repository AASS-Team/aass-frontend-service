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
