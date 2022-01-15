var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
import { months } from './constants';

export const isDev = () => process.env.NODE_ENV === 'development';

export const getMonthString = (monthAvailability: Array<String>) => {
	if (!monthAvailability.includes('NA')) {
		return 'all year';
	}

	const availableMonths = monthAvailability.map((m, i) =>
		m === 'NA' ? -1 : i,
	);

	const startMonthIndices: Array<number> = [];
	const endMonthIndices: Array<number> = [];

	availableMonths.forEach((m, i) => {
		if (availableMonths[i] === -1) {
			return;
		}

		const beforeMonthIndex = i === 0 ? 11 : i - 1;

		// check to see if the month before it has a value of -1
		if (availableMonths[beforeMonthIndex] === -1 && m !== -1) {
			// if -1, that means it is the start of a range of months
			startMonthIndices.push(m);

			// new index, starting with the current month
			let j = i;

			// loop over months starting with the current month
			// until we find another -1, which will tell us the end of the range
			while (availableMonths[j] !== -1) {
				// if not december, increment
				if (j !== 11) {
					j++;

					// if december, reset to january
				} else {
					j = 0;
				}
			}
			// if the -1 is found in january, last month in range must be december
			// if -1 is found in any other month, last month in range is the month before the -1
			endMonthIndices.push(j === 0 ? 11 : j - 1);
		}
	});

	if (startMonthIndices.length !== endMonthIndices.length) {
		console.error('Error calculating month strings');
		return;
	}

	const monthStrings = startMonthIndices.map(
		(m, i) => `${months[m].short} - ${months[endMonthIndices[i]].short}`,
	);

	return monthStrings.join(', ');
};

export const getAuthIdFromJwt = (token: string) =>
	jwt.verify(token, jwtSecret)?.authId;
