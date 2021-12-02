export const isNullUndefinedOrWhitespace = (
	text: string | null | undefined
) => {
	if (text === null || text === undefined) {
		return true;
	}
	return text.trim() === '';
};

export const isDevEnv = () => {
	return process.env.node_env === 'development';
};
