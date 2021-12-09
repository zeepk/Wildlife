import { maxUsernameLength, minUsernameLength } from 'utils/constants';

export const isNullUndefinedOrWhitespace = (
	text: string | null | undefined,
) => {
	if (text === null || text === undefined) {
		return true;
	}
	return text.trim() === '';
};

export const isNullOrUndefined = (x: any) => x === null || x === undefined;

export const isDevEnv = () => {
	return process.env.node_env === 'development';
};

export const usernameValid = (username: string | undefined) => {
	return (
		username !== undefined &&
		!isNullUndefinedOrWhitespace(username) &&
		username.length >= minUsernameLength &&
		username.length <= maxUsernameLength
	);
};
