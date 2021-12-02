import express, { Request, Response } from 'express';
import { Critter } from '@/models/critter';
import { critterTypes } from '@/utils/constants';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const router = express.Router();

router.get('/api/update', (req: Request, res: Response) => {
	const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
	const TOKEN_PATH = 'token.json';

	const spreadsheetId = '13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4';
	const fishSheetRange = 'Fish!2:81';
	const bugsSheetRange = 'Insects!2:81';
	const seaSheetRange = 'Sea Creatures!2:41';
	const fossilsSheetRange = 'Fossils!2:74';
	const artSheetRange = 'Art!2:71';
	const gyroidsSheetRange = 'Gyroids!2:190';
	const songsSheetRange = 'Music!2:111';

	fs.readFile('credentials.json', (err: any, content: any) => {
		if (err) return console.log('Error loading client secret file:', err);
		authorize(JSON.parse(content), updateDocuments);
	});

	function authorize(credentials: any, callback: any) {
		const { client_secret, client_id, redirect_uris } = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
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
						err
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
						// console.log(row[1]);
						const exists = await Critter.exists({ name: row[1] });
						if (exists) {
							return;
						}
						Critter.create(
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
							}
							// },
							// { upsert: true }
						);
						console.log('Created');
					});
					console.log('Done creating');
				} else {
					console.log('No data found.');
				}
			}
		);
	}
	return res.status(200).send('updated');
});

export { router as updateRouter };
