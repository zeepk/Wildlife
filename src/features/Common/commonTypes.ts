export type AuthDataLogin = {
	email: string;
	password: string;
};

export type AuthDataCreateAccount = {
	email: string;
	username: string;
	password: string;
};

export type AuthResponseCreateAccount = {
	errors: Array<string>;
	token?: string;
};

export type AuthDataResetPassword = {
	email?: string | null;
	password: string;
	token?: string | null;
};
