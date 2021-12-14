import express, { Request, Response } from 'express';
import { Critter } from '@/models/critter';
import { critterTypes } from '@/utils/constants';
import { Villager } from '@/models/villager';
import { getMonthString } from '@/utils/helperFunctions';
import { Art } from '@/models/art';
import { Fossil } from '@/models/fossil';
import { Song } from '@/models/song';
import { Reaction } from '@/models/reaction';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const router = express.Router();

router.get('/api/update', (req: Request, res: Response) => {
	console.log('Updating...');
	console.log('If invalid_grant below, delete token.json and try again');
	const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
	const TOKEN_PATH = 'token.json';

	const spreadsheetId = '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4';
	const fishSheetRange = 'Fish!2:81';
	const bugsSheetRange = 'Insects!2:81';
	const seaSheetRange = 'Sea Creatures!2:41';
	const fossilsSheetRange = 'Fossils!2:74';
	const artSheetRange = 'Artwork!2:71';
	const gyroidsSheetRange = 'Gyroids!2:190';
	const songsSheetRange = 'Music!2:111';
	const villagerSheetRange = 'Villagers!2:414';
	const reactionSheetRange = 'Reactions!2:89';

	fs.readFile('credentials.json', (err: any, content: any) => {
		if (err) return console.log('Error loading client secret file:', err);
		authorize(JSON.parse(content), updateDocuments);
	});

	function authorize(credentials: any, callback: any) {
		const { client_secret, client_id, redirect_uris } = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0],
		);

		// Check if we have previously stored a token.
		fs.readFile(TOKEN_PATH, (err: any, token: any) => {
			if (err) {
				return getNewToken(oAuth2Client, callback);
			}
			oAuth2Client.setCredentials(JSON.parse(token));
			callback(oAuth2Client);
		});
	}

	function getNewToken(oAuth2Client: any, callback: any) {
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		rl.question('Enter the code from that page here: ', (code: any) => {
			rl.close();
			oAuth2Client.getToken(code, (err: any, token: any) => {
				if (err)
					return console.error(
						'Error while trying to retrieve access token',
						err,
					);
				oAuth2Client.setCredentials(token);
				fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
					if (err) return console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});
				callback(oAuth2Client);
			});
		});
	}

	function updateDocuments(auth: any) {
		const sheets = google.sheets({ version: 'v4', auth });
		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: fishSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Critter.exists({ name: row[1] });
						if (exists) {
							return;
						}
						// TODO:
						// get the time avail.
						// get the southernMonths
						// specify nothernMonths

						const months = [
							row[12],
							row[13],
							row[14],
							row[15],
							row[16],
							row[17],
							row[18],
							row[19],
							row[20],
							row[21],
							row[22],
							row[23],
							row[24],
							row[25],
							row[26],
							row[27],
							row[28],
							row[29],
							row[30],
							row[31],
							row[32],
							row[33],
							row[34],
							row[35],
						];

						const northernMonths = months.filter((m, i) => i < 12);
						const southernMonths = months.filter((m, i) => i >= 12);

						const northernMonthString = getMonthString(northernMonths);
						const southernMonthString = getMonthString(southernMonths);

						const timeString = months.includes('All day')
							? 'all day'
							: months.find((m) => m !== 'NA');

						await Critter.create(
							// { name: row[1] },
							{
								// $set: {
								name: row[1],
								order: row[0],
								critter_type: critterTypes.FISH,
								icon_uri: row[2].split('"')[1],
								image_uri: row[3].split('"')[1],
								bells_sell: Number(row[5]),
								source: row[6],
								shadow_size: row[7],
								difficulty: row[8],
								vision: row[9],
								catches_to_unlock: Number(row[10]),
								spawn_rates: row[11],
								northernMonths: northernMonthString,
								southernMonths: southernMonthString,
								time: timeString,
								nh_jan: row[12],
								nh_feb: row[13],
								nh_mar: row[14],
								nh_apr: row[15],
								nh_may: row[16],
								nh_jun: row[17],
								nh_jul: row[18],
								nh_aug: row[19],
								nh_sep: row[20],
								nh_oct: row[21],
								nh_nov: row[22],
								nh_dec: row[23],
								sh_jan: row[24],
								sh_feb: row[25],
								sh_mar: row[26],
								sh_apr: row[27],
								sh_may: row[28],
								sh_jun: row[29],
								sh_jul: row[30],
								sh_aug: row[31],
								sh_sep: row[32],
								sh_oct: row[33],
								sh_nov: row[34],
								sh_dec: row[35],
								description: row[38],
								ueid: row[49],
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Fish: ${row[1]}`);
					});
					console.log('Done creating Fish');
				} else {
					console.log('No Fish data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: bugsSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Critter.exists({ name: row[1] });
						if (exists) {
							return;
						}
						// TODO:
						// get the time avail.
						// get the southernMonths
						// specify nothernMonths

						const months = [
							row[10],
							row[11],
							row[12],
							row[13],
							row[14],
							row[15],
							row[16],
							row[17],
							row[18],
							row[19],
							row[20],
							row[21],
							row[22],
							row[23],
							row[24],
							row[25],
							row[26],
							row[27],
							row[28],
							row[29],
							row[30],
							row[31],
							row[32],
							row[33],
						];

						const northernMonths = months.filter((m, i) => i < 12);
						const southernMonths = months.filter((m, i) => i >= 12);

						const northernMonthString = getMonthString(northernMonths);
						const southernMonthString = getMonthString(southernMonths);

						const timeString = months.includes('All day')
							? 'all day'
							: months.find((m) => m !== 'NA');

						await Critter.create(
							// { name: row[1] },
							{
								// $set: {
								name: row[1],
								order: row[0],
								critter_type: critterTypes.BUG,
								icon_uri: row[2].split('"')[1],
								image_uri: row[3].split('"')[1],
								bells_sell: Number(row[5]),
								source: row[6],
								weather: row[7],
								catches_to_unlock: Number(row[8]),
								spawn_rates: row[9],
								northernMonths: northernMonthString,
								southernMonths: southernMonthString,
								time: timeString,
								nh_jan: row[10],
								nh_feb: row[11],
								nh_mar: row[12],
								nh_apr: row[13],
								nh_may: row[14],
								nh_jun: row[15],
								nh_jul: row[16],
								nh_aug: row[17],
								nh_sep: row[18],
								nh_oct: row[19],
								nh_nov: row[20],
								nh_dec: row[21],
								sh_jan: row[22],
								sh_feb: row[23],
								sh_mar: row[24],
								sh_apr: row[25],
								sh_may: row[26],
								sh_jun: row[27],
								sh_jul: row[28],
								sh_aug: row[29],
								sh_sep: row[30],
								sh_oct: row[31],
								sh_nov: row[32],
								sh_dec: row[33],
								description: row[36],
								ueid: row[46],
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Bug: ${row[1]}`);
					});
					console.log('Done creating Bugs');
				} else {
					console.log('No Bugs data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: seaSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Critter.exists({ name: row[1] });
						if (exists) {
							return;
						}

						const months = [
							row[10],
							row[11],
							row[12],
							row[13],
							row[14],
							row[15],
							row[16],
							row[17],
							row[18],
							row[19],
							row[20],
							row[21],
							row[22],
							row[23],
							row[24],
							row[25],
							row[26],
							row[27],
							row[28],
							row[29],
							row[30],
							row[31],
							row[32],
							row[33],
						];

						const northernMonths = months.filter((m, i) => i < 12);
						const southernMonths = months.filter((m, i) => i >= 12);

						const northernMonthString = getMonthString(northernMonths);
						const southernMonthString = getMonthString(southernMonths);

						const timeString = months.includes('All day')
							? 'all day'
							: months.find((m) => m !== 'NA');

						await Critter.create(
							// { name: row[1] },
							{
								// $set: {
								name: row[1],
								order: row[0],
								critter_type: critterTypes.SEA,
								icon_uri: row[2].split('"')[1],
								image_uri: row[3].split('"')[1],
								bells_sell: Number(row[5]),
								shadow_size: row[6],
								speed: row[7],
								catches_to_unlock: Number(row[8]),
								spawn_rates: row[9],
								northernMonths: northernMonthString,
								southernMonths: southernMonthString,
								time: timeString,
								nh_jan: row[10],
								nh_feb: row[11],
								nh_mar: row[12],
								nh_apr: row[13],
								nh_may: row[14],
								nh_jun: row[15],
								nh_jul: row[16],
								nh_aug: row[17],
								nh_sep: row[18],
								nh_oct: row[19],
								nh_nov: row[20],
								nh_dec: row[21],
								sh_jan: row[22],
								sh_feb: row[23],
								sh_mar: row[24],
								sh_apr: row[25],
								sh_may: row[26],
								sh_jun: row[27],
								sh_jul: row[28],
								sh_aug: row[29],
								sh_sep: row[30],
								sh_oct: row[31],
								sh_nov: row[32],
								sh_dec: row[33],
								description: row[36],
								ueid: row[49],
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Sea Creature: ${row[1]}`);
					});
					console.log('Done creating Sea Creatures');
				} else {
					console.log('No Sea Creature data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: artSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Art.exists({ name: row[0] });
						if (exists) {
							return;
						}

						await Art.create(
							// { name: row[1] },
							{
								// $set: {
								name: row[0],
								icon_uri: row[1].split('"')[1],
								image_uri: row[2].split('"')[1],
								genuine: row[3] === 'Yes',
								ueid: row[29],
								critter_type: critterTypes.ART,
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Art: ${row[0]}`);
					});
					console.log('Done creating Art');
				} else {
					console.log('No Art data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: reactionSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Reaction.exists({ name: row[1] });
						if (exists) {
							return;
						}

						await Reaction.create(
							// { name: row[1] },
							{
								// $set: {
								order: Number(row[0]),
								name: row[1],
								image_uri: row[2].split('"')[1],
								ueid: row[10],
								source: row[3],
								source_notes: row[4],
								event: row[5] === 'NA' ? '' : row[5],
								exclusive: row[6] === 'Yes',
								critter_type: critterTypes.REACTION,
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Reaction: ${row[1]}`);
					});
					console.log('Done creating Reactions');
				} else {
					console.log('No Reaction data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: songsSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Song.exists({ name: row[0] });
						if (exists) {
							return;
						}

						await Song.create(
							// { name: row[1] },
							{
								// $set: {
								name: row[0],
								image_uri: row[2].split('"')[1],
								ueid: row[18],
								source: row[9],
								source_notes: row[10],
								critter_type: critterTypes.SONG,
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Song: ${row[0]}`);
					});
					console.log('Done creating Songs');
				} else {
					console.log('No Song data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: fossilsSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						const exists = await Fossil.exists({ name: row[0] });
						if (exists) {
							return;
						}

						await Fossil.create(
							// { name: row[1] },
							{
								// $set: {
								name: row[0],
								image_uri: row[1].split('"')[1],
								ueid: row[16],
								bells_sell: Number(row[3]),
								critter_type: critterTypes.FOSSIL,
							},
							// },
							// { upsert: true }
						);
						console.log(`Created Fossil: ${row[0]}`);
					});
					console.log('Done creating Fossils');
				} else {
					console.log('No Fossil data found.');
				}
			},
		);

		sheets.spreadsheets.values.get(
			{
				spreadsheetId,
				range: villagerSheetRange,
				valueRenderOption: 'FORMULA',
			},
			(err: any, res: any) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					rows.map(async (row: any) => {
						// console.log(row[1]);
						const exists = await Villager.exists({ name: row[0] });
						if (exists) {
							return;
						}
						Villager.create({
							name: row[0],
							icon_uri: row[1].split('"')[1],
							image_uri: row[2].split('"')[1],
							species: row[4],
							gender: row[5],
							personality: row[6],
							birthday: row[9],
							ueid: row[29],
							critter_type: critterTypes.VILLAGER,
						});
						console.log(`Created Villager: ${row[0]}`);
					});
				} else {
					console.log('No Villager data found');
				}
			},
		);
	}
	return res.status(200).send('updated');
});

export { router as updateRouter };
