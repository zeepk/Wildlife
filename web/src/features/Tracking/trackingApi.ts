import requestWrapper from '../../utils/requestWrapper';
import { caughtUrl, fishUrl } from 'utils/constants';

export async function getFish() {
	const requestOptions = {
		url: `${fishUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}
