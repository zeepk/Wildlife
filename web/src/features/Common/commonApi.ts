import requestWrapper from 'utils/requestWrapper';
import {
	AuthDataCreateAccount,
	AuthDataUpdateProfile,
	UpdateCaughtPayload,
} from 'features/Common/commonTypes';
import { profileUrl, caughtUrl, villagerUrl } from 'utils/constants';

export async function getProfile(authId: string) {
	const requestOptions = {
		url: `${profileUrl}/${authId}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function updateProfile(data: AuthDataUpdateProfile) {
	const requestOptions = {
		url: profileUrl,
		method: 'PUT',
		data,
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

export async function getCaught(authId: string) {
	const requestOptions = {
		url: `${caughtUrl}/${authId}`,
		method: 'GET',
		data: {
			authId,
		},
	};
	return await requestWrapper(requestOptions);
}

export async function createCaught(data: UpdateCaughtPayload) {
	const requestOptions = {
		url: `${caughtUrl}`,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function deleteCaught(data: UpdateCaughtPayload) {
	const requestOptions = {
		url: `${caughtUrl}`,
		method: 'DELETE',
		data,
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
