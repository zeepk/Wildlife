import requestWrapper from '../../utils/requestWrapper';
import { fishUrl, bugsUrl } from 'utils/constants';

export async function getFish() {
	const requestOptions = {
		url: `${fishUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getBugs() {
	const requestOptions = {
		url: `${bugsUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}
