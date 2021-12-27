// version
export const versionNumber = '0.2.0';

// urls

export const apiBaseUrl = process.env.REACT_APP_API_URL;
export const loginUrl = `${apiBaseUrl}/login`;
export const userUrl = `${apiBaseUrl}/api/user`;
export const caughtUrl = `${apiBaseUrl}/api/caught`;
export const profileUrl = `${apiBaseUrl}/api/profile`;
export const importUrl = `${apiBaseUrl}/api/profile/import`;
export const fishUrl = `${apiBaseUrl}/api/fish`;
export const bugsUrl = `${apiBaseUrl}/api/bugs`;
export const seaUrl = `${apiBaseUrl}/api/sea`;
export const villagerUrl = `${apiBaseUrl}/api/villagers`;
export const fossilsUrl = `${apiBaseUrl}/api/fossils`;
export const musicUrl = `${apiBaseUrl}/api/songs`;
export const reactionsUrl = `${apiBaseUrl}/api/reactions`;
export const artUrl = `${apiBaseUrl}/api/art`;
export const achievementsUrl = `${apiBaseUrl}/api/achievements`;
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
export const accountSettingsImportDataText = 'Import from old AC Wildlife';
export const accountSettingsImportDataButtonText = 'Import';
export const accountSettingsImportDataPlaceholderText = 'Data text';
export const accountSettingsImportDataLoadingText =
	'Importing your data. This could take a minute or so.';
export const shadowSizeText = 'Shadow Size:';
export const sourceText = 'Location:';
export const bellsSellText = 'Sale price:';
export const weatherText = 'Weather:';
export const speedText = 'Speed:';
export const rarityText = 'Rarity:';
export const artViewButtonText = 'View Artwork';
export const artAlwaysRealText = 'Always real!';
export const artFakeComparisonButtonText = 'View fake comparison';
export const landingPageNewUserText =
	'Welcome!\nThis site is still in beta :)\nTry creating an account by clicking Login above!';
export const landingPageExistingUserText =
	'Hiya, still under construction here.\nLet me know if you have any feedback with one of the links below!';

export const successMessageDataImported =
	'Data imported successfully! Try refreshing in a minute or so.';
export const successMessageAccountSettingsUpdated =
	'Account updated successfully!';

export const errorMessageAccountSettingsCannotImport =
	'Error importing data. Please try again or contact support.';
export const errorMessageAccountSettingsNotLoggedIn =
	'You must be logged in to view your account settings!';
export const errorMessageAccountSettingsCannotUpdate =
	'Could not update your account. Please try again or contact support.';
export const errorMessageNoArtFound = 'High-res art image could not be loaded.';
export const errorMessageInvalidImportData =
	'Invalid format for import data. Please try again or contact support.';

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
	ACHIEVEMENT = 'ACHIEVEMENT',
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
	{ id: 0, text: 'Fish', path: '/fish', active: true },
	{ id: 1, text: 'Bugs', path: '/bugs', active: true },
	{ id: 2, text: 'Sea', path: '/sea', active: true },
	{ id: 3, text: 'Fossils', path: '/fossils', active: true },
	{ id: 4, text: 'Art', path: '/art', active: true },
	{ id: 5, text: 'Music', path: '/music', active: true },
	{ id: 6, text: 'Reactions', path: '/reactions', active: true },
	{ id: 7, text: 'Villagers', path: '/villagers', active: false },
	{ id: 8, text: 'Achievements', path: '/achievements', active: false },
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
