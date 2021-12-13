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
export const bugsUrl = `${apiBaseUrl}/api/bugs`;
export const seaUrl = `${apiBaseUrl}/api/sea`;
export const villagerUrl = `${apiBaseUrl}/api/villagers`;
export const defaultAvatarUrl =
	'https://64.media.tumblr.com/660a46fe7a5825d898e36fc8c240685b/bd38759d70dd2985-ab/s400x600/05eb60dacdbb47e946713a8aaa048274dc176cb7.png';
export const twitterUsername = '@matthughes2112';
export const twitterUrl = `https://twitter.com/${twitterUsername}`;
export const githubUrl = 'https://github.com/zeepk/wildlife';
export const twitchUrl = 'https://www.twitch.tv/zee_pk';

// verbiage

export const homeTitleText = 'Tracking';
export const homeText = 'Sample React Redux TypeScript app for Tracking';
export const accountSettingsTitleText = 'Account Settings';
export const accountSettingsUsernameText = 'Username';
export const accountSettingsAvatarUriText = 'Villager Icon';
export const accountSettingsSelectAVillagerText = 'Select a villager';
export const accountSettingsHemisphereText = 'Hemisphere';

export const successMessageAccountSettingsUpdated =
	'Account updated successfully!';

export const errorMessageAccountSettingsNotLoggedIn =
	'You must be logged in to view your account settings!';
export const errorMessageAccountSettingsCannotUpdate =
	'Could not update your account. Please try again or contact support.';

// thresholds

export const maxNumberOfTracking = 5000;
export const maxUsernameLength = 15;
export const minUsernameLength = 3;
export const globalToastLifetime = 5000;

export const errorMessageUsernameInvalidLength = `Let's keep it between ${minUsernameLength} and ${maxUsernameLength} characters`;

// types

export enum critterTypes {
	FISH = 'FISH',
	BUG = 'BUG',
	SEA = 'SEA',
	SONG = 'SONG',
	FOSSIL = 'FOSSIL',
	ART = 'ART',
	GYROID = 'GYROID',
	VILLAGER = 'VILLAGER',
	REACTION = 'REACTION',
}

export enum hemispheres {
	NORTHERN = 0,
	SOUTHERN = 1,
}

export const hemisphereChoices = [
	{
		id: hemispheres.NORTHERN,
		text: 'Northern',
	},
	{
		id: hemispheres.SOUTHERN,
		text: 'Southern',
	},
];

export const footerLinks = [
	{ id: 0, text: `v${versionNumber}`, class: 'version' },
	{ id: 1, text: 'github code', link: githubUrl, class: 'code' },
	{ id: 2, text: 'twitter / feedback', link: twitterUrl, class: 'twitter' },
	{
		id: 3,
		text: 'watch me code this on twitch',
		link: twitchUrl,
		class: 'twitch',
	},
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
