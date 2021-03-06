import requestWrapper from '../../utils/requestWrapper';
import {
	fishUrl,
	bugsUrl,
	seaUrl,
	fossilsUrl,
	artUrl,
	musicUrl,
	reactionsUrl,
	achievementsUrl,
	totalsUrl,
	friendsCaughtUrl,
} from 'utils/constants';

export async function getFish(data: { hour: number; month: string }) {
	const requestOptions = {
		url: `${fishUrl}`,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function getBugs(data: { hour: number; month: string }) {
	const requestOptions = {
		url: bugsUrl,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function getSea(data: { hour: number; month: string }) {
	const requestOptions = {
		url: `${seaUrl}`,
		method: 'POST',
		data,
	};
	return await requestWrapper(requestOptions);
}

export async function getFossils() {
	const requestOptions = {
		url: `${fossilsUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getArt() {
	const requestOptions = {
		url: `${artUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getMusic() {
	const requestOptions = {
		url: `${musicUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getReactions() {
	const requestOptions = {
		url: `${reactionsUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getAchievements() {
	const requestOptions = {
		url: `${achievementsUrl}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getTotals() {
	const requestOptions = {
		url: totalsUrl,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}

export async function getFriendsCaught(ueid: string) {
	const requestOptions = {
		url: `${friendsCaughtUrl}/${ueid}`,
		method: 'GET',
	};
	return await requestWrapper(requestOptions);
}
