import requestWrapper from 'utils/requestWrapper';
import { AuthDataCreateAccount } from 'features/Common/commonTypes';
import { profileUrl } from 'utils/constants';

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
