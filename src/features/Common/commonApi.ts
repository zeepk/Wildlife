import requestWrapper from 'utils/requestWrapper';
import {
	AuthDataLogin,
	AuthDataCreateAccount,
} from 'features/Common/commonTypes';

export async function checkIfUserLoggedIn(token: string) {
	const requestOptions = {
		url: 'checkUrl',
		method: 'GET',
		token,
	};
	return await requestWrapper(requestOptions);
}

export async function logUserIn(data: AuthDataLogin) {
	const requestOptions = {
		url: 'loginUrl',
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function createUserAccount(data: AuthDataCreateAccount) {
	const requestOptions = {
		url: 'createUrl',
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}
