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
	return process.env.NODE_ENV === 'development';
};

export const usernameValid = (username: string | undefined) => {
	return (
		username !== undefined &&
		!isNullUndefinedOrWhitespace(username) &&
		username.length >= minUsernameLength &&
		username.length <= maxUsernameLength
	);
};

export const calculateRarity = (rarityString: string) => {
	const isRange = rarityString.includes('–');

	let numericValue = -1;
	if (!isRange) {
		numericValue = Number(rarityString);
	} else {
		const valueArray = rarityString.split('–');
		const rangeStart = Number(valueArray[0]);
		const rangeEnd = Number(valueArray[1]);
		const average = (rangeStart + rangeEnd) / 2;
		numericValue = average;
	}

	return Math.floor((numericValue / 14) * 100) + '%';
};

export const isStringValidJson = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const setCookie = (name: string, value: string, days: number) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie =
		name + '=' + (value || '') + expires + ';SameSite=none;secure;path=/';

	// document.cookie = `${name}=${
	// 	value || ''
	// }${expires};SameSite=none;secure;domain=${process.env.API_URL};path=/`;
};
