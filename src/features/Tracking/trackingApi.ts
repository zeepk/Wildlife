import requestWrapper from '../../utils/requestWrapper';
import { fishUrl } from 'utils/constants';

export async function getFish() {
	const requestOptions = {
		url: `${fishUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}
