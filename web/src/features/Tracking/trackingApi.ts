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
} from 'utils/constants';

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

export async function getSea() {
	const requestOptions = {
		url: `${seaUrl}`,
		method: 'GET',
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
