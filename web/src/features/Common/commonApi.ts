import requestWrapper from 'utils/requestWrapper';
import { AuthDataCreateAccount } from 'features/Common/commonTypes';
import { profileUrl, caughtUrl, villagerUrl } from 'utils/constants';

export async function getProfile(userId: string) {
	const requestOptions = {
		url: `${profileUrl}/${userId}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function createProfile(data: AuthDataCreateAccount) {
	const requestOptions = {
		url: profileUrl,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function getCaught(userId: string) {
	const requestOptions = {
		url: `${caughtUrl}/${userId}`,
		method: 'GET',
		data: {
			userId,
		},
	};
	return await requestWrapper(requestOptions);
}

export async function getVillagers() {
	const requestOptions = {
		url: villagerUrl,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}
