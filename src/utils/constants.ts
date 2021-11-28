import { DateTime } from 'luxon';

// version
export const versionNumber = '1.1.1';
export const dxpStart = DateTime.fromJSDate(
	new Date('05 November 2021 12:00 UTC')
);
export const dxpEnd = DateTime.fromJSDate(
	new Date('15 November 2021 12:00 UTC')
);
export const isDxpUpcoming = DateTime.now() < dxpStart;
export const isDxpOver = DateTime.now() > dxpEnd;

// urls

export const apiBaseUrl = process.env.REACT_APP_API_URL;
export const twitterUsername = '@matthughes2112';
export const twitterUrl = `https://twitter.com/${twitterUsername}`;
export const githubUrl =
	'https://github.com/zeepk/react-redux-typescript-template';

// fish

export const fishUrl = `${apiBaseUrl}/users/gains/fish`;

// verbiage

export const homeTitleText = 'Fish';
export const homeText = 'Sample React Redux TypeScript app for Fish';

// thresholds

export const maxNumberOfFish = 5000;

export enum fishTypes {
	SALMON,
	TROUT,
	MONKFISH,
}

export const footerLinks = [
	{ id: 0, text: `v${versionNumber}`, class: 'version' },
	{ id: 1, text: 'github code', link: githubUrl, class: 'code' },
	{ id: 2, text: 'twitter / feedback', link: twitterUrl, class: 'twitter' },
];
