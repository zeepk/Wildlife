import requestWrapper from 'utils/requestWrapper';
import {
	AuthDataCreateAccount,
	AuthDataUpdateProfile,
	UpdateCaughtPayload,
} from 'features/Common/commonTypes';
import {
	profileUrl,
	caughtUrl,
	villagerUrl,
	importUrl,
	friendRequestsUrl,
	searchForUserUrl,
	addFriendUrl,
	removeFriendUrl,
} from 'utils/constants';

export async function getProfile() {
	const requestOptions = {
		url: profileUrl,
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

export async function importData(data: {
	authId: string;
	caughtItems: Array<string>;
}) {
	const requestOptions = {
		url: importUrl,
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

export async function getFriendRequests(authId: string) {
	const requestOptions = {
		url: `${friendRequestsUrl}/${authId}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function sendFriendRequest(username: string) {
	const requestOptions = {
		url: `${addFriendUrl}/${username}`,
		method: 'POST',
	};
	return await requestWrapper(requestOptions);
}

export async function respondToFriendRequest(data: {
	requestId: string;
	accepted: boolean;
}) {
	const requestOptions = {
		url: friendRequestsUrl,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function removeFriend(username: string) {
	const requestOptions = {
		url: `${removeFriendUrl}/${username}`,
		method: 'POST',
	};
	return await requestWrapper(requestOptions);
}

export async function searchForProfile(data: {
	profileId: string;
	username: string;
}) {
	const requestOptions = {
		url: searchForUserUrl,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}
