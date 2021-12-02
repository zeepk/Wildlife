import { DateTime } from 'luxon';

// version
export const versionNumber = '0.1.0';
export const dxpStart = DateTime.fromJSDate(
	new Date('05 November 2021 12:00 UTC'),
);
export const dxpEnd = DateTime.fromJSDate(
	new Date('15 November 2021 12:00 UTC'),
);
export const isDxpUpcoming = DateTime.now() < dxpStart;
export const isDxpOver = DateTime.now() > dxpEnd;

// urls

export const apiBaseUrl = process.env.REACT_APP_API_URL;
export const loginUrl = `${apiBaseUrl}/login`;
export const userUrl = `${apiBaseUrl}/api/user`;
export const caughtUrl = `${apiBaseUrl}/api/caught`;
export const profileUrl = `${apiBaseUrl}/api/profile`;
export const fishUrl = `${apiBaseUrl}/api/fish`;
export const defaultAvatarUrl =
	'https://64.media.tumblr.com/660a46fe7a5825d898e36fc8c240685b/bd38759d70dd2985-ab/s400x600/05eb60dacdbb47e946713a8aaa048274dc176cb7.png';
export const twitterUsername = '@matthughes2112';
export const twitterUrl = `https://twitter.com/${twitterUsername}`;
export const githubUrl = 'https://github.com/zeepk/wildlife';

// verbiage

export const homeTitleText = 'Tracking';
export const homeText = 'Sample React Redux TypeScript app for Tracking';

// thresholds

export const maxNumberOfTracking = 5000;

// types

export enum critterTypes {
	FISH,
	BUG,
	SEA,
	SONG,
	FOSSIL,
	ART,
	GYROID,
	VILLAGER,
	REACTION,
}

export const footerLinks = [
	{ id: 0, text: `v${versionNumber}`, class: 'version' },
	{ id: 1, text: 'github code', link: githubUrl, class: 'code' },
	{ id: 2, text: 'twitter / feedback', link: twitterUrl, class: 'twitter' },
];

export const navbarMenuItems = [
	{ id: 0, text: 'Fish', path: '/fish' },
	{ id: 1, text: 'Bugs', path: '/bugs' },
	{ id: 2, text: 'Sea', path: '/sea' },
];

export const months = [
	{
		nhColumn: 'nh_jan',
		shColumn: 'sh_jan',
		name: 'January',
	},
	{
		nhColumn: 'nh_feb',
		shColumn: 'sh_feb',
		name: 'February',
	},
	{
		nhColumn: 'nh_mar',
		shColumn: 'sh_mar',
		name: 'March',
	},
	{
		nhColumn: 'nh_apr',
		shColumn: 'sh_apr',
		name: 'April',
	},
	{
		nhColumn: 'nh_may',
		shColumn: 'sh_may',
		name: 'May',
	},
	{
		nhColumn: 'nh_jun',
		shColumn: 'sh_jun',
		name: 'June',
	},
	{
		nhColumn: 'nh_jul',
		shColumn: 'sh_jul',
		name: 'July',
	},
	{
		nhColumn: 'nh_aug',
		shColumn: 'sh_aug',
		name: 'August',
	},
	{
		nhColumn: 'nh_sep',
		shColumn: 'sh_sep',
		name: 'September',
	},
	{
		nhColumn: 'nh_oct',
		shColumn: 'sh_oct',
		name: 'October',
	},
	{
		nhColumn: 'nh_nov',
		shColumn: 'sh_nov',
		name: 'November',
	},
	{
		nhColumn: 'nh_dec',
		shColumn: 'sh_dec',
		name: 'December',
	},
];
