import requestWrapper from '../../utils/requestWrapper';
import { fishUrl } from 'utils/constants';

export async function getFish(username: string) {
	const requestOptions = {
		url: `${fishUrl}/${username}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}
