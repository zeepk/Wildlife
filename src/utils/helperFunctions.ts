var jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
import { hemispheres, months, daysArray, ignoredEvents } from './constants';
import { ICritter } from '@/models/critter';
import { IGameEvent } from '@/models/gameevent';

export const isDev = () => process.env.NODE_ENV === 'development';

export const getMonthString = (monthAvailability: Array<String>) => {
	if (!monthAvailability.includes('NA')) {
		return 'all year';
	}

	const availableMonths = monthAvailability.map((m, i) =>
		m === 'NA' ? -1 : i
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
		(m, i) => `${months[m].short} - ${months[endMonthIndices[i]].short}`
	);

	return monthStrings.join(', ');
};

export const isNullUndefinedOrWhitespace = (
	text: string | null | undefined
) => {
	if (text === null || text === undefined) {
		return true;
	}
	return text.trim() === '';
};

export const getAuthIdFromJwt = (token: string | null) => {
	if (isNullUndefinedOrWhitespace(token)) {
		console.log('jwt not provided');
		return;
	}
	try {
		return jwt.verify(token, jwtSecret)?.authId;
	} catch (error) {
		console.log('Error reading user jwt');
		console.log(token?.toString().substring(0, 10));
		console.log(error);
	}
};
export const isAvailableInMonth = (
	critter: ICritter,
	month: string,
	hemisphere: hemispheres
) => {
	if (isNullUndefinedOrWhitespace(month)) {
		return false;
	}
	const monthString = month.toLowerCase().substring(0, 3);
	const hemisphereString = hemisphere === hemispheres.NORTHERN ? 'nh' : 'sh';
	const propertyName = `${hemisphereString}_${monthString}`;
	const monthAvailability = critter[propertyName];

	if (
		critter.name === 'abalone' ||
		isNullUndefinedOrWhitespace(monthAvailability)
	) {
		console.log(propertyName);
		console.log(monthAvailability);
		console.log(monthAvailability !== 'NA');
	}

	return monthAvailability !== 'NA';
};

// sample time string: '4 AM – 8 AM; 5 PM – 7 PM'
export const isAvailableInHour = (time: string, hour: number) => {
	if (isNullUndefinedOrWhitespace(time)) {
		return false;
	}
	if (time.toLowerCase() === 'all day') {
		return true;
	}

	const timeArray = time.split('; ');
	// [0]: '4 AM – 8 AM'
	// [1]: '5 PM – 7 PM'
	const availableArray = timeArray.map(timeString => {
		// timeString: '4 AM – 8 AM'
		const timeRange = timeString.replace(/\u2013/g, '-').split('-');
		// [0]: '4 AM'
		// [1]: '8 AM'
		const startTimeNumber = parseInt(timeRange[0]?.split(' ')[0]);
		const endTimeNumber = parseInt(timeRange[1]?.split(' ')[0]);
		if (isNaN(startTimeNumber) || isNaN(endTimeNumber)) {
			console.log(timeRange[0]);
		}
		const startTime = timeRange[0]?.includes('AM')
			? startTimeNumber
			: startTimeNumber + 12;
		const endTime = timeRange[1]?.includes('AM')
			? endTimeNumber
			: endTimeNumber + 12;
		if (endTime < startTime) {
			return hour >= startTime || hour <= endTime;
		}
		return hour >= startTime && hour < endTime;
	});

	return availableArray.includes(true);
};

export const formatEvent = (e: IGameEvent, isNorthernHemisphere: boolean) => {
	const name = e.name.toLowerCase();
	if (
		ignoredEvents.includes(e.name) ||
		name.includes('shopping') ||
		name.includes('before')
	) {
		return;
	}

	let activeDates: any[] = [];
	let activeDateRange: any[] = [];
	if (e.dates_nh === 'NA' && e.dates_sh === 'NA') {
		return;
	}
	if (e.name.includes('hemisphere')) {
		if (e.name.includes('southern') && isNorthernHemisphere) {
			return;
		}
		if (e.name.includes('nothern') && !isNorthernHemisphere) {
			return;
		}
	}

	const year = isNaN(Number(e.year)) ? new Date().getFullYear() : e.year;

	const dateString = (isNorthernHemisphere ? e.dates_nh : e.dates_sh).replace(
		/\u2013/g,
		'-'
	);

	if (dateString.includes('-')) {
		const dates = dateString.split('-');
		const startDate = new Date(`${dates[0].trim()} ${year}`.trim());
		const endDate = new Date(`${dates[1].trim()} ${year}`.trim());
		if (endDate < startDate) {
			endDate.setFullYear(endDate.getFullYear() + 1);
		}
		activeDateRange = [startDate, endDate];
	} else if (dateString.includes(' of ')) {
		const dates = dateString.split(';\n');
		activeDates = dates.map(d => {
			const month = d.split(' of ')[1].trim();
			const dayOffset = Number(d.charAt(0));
			const dayName = d.split(' of ')[0].split(' ')[1].trim().toLowerCase();
			const dayIndex = daysArray.indexOf(dayName);
			const startingDate = new Date(`${month} 1 ${year}`);
			while (startingDate.getDay() <= 31) {
				if (startingDate.getDay() === dayIndex) {
					const dateNumber = startingDate.getDate() + (dayOffset - 1) * 7;
					startingDate.setDate(dateNumber);
					return startingDate;
				}
				startingDate.setDate(startingDate.getDate() + 1);
			}
		});
	} else {
		activeDates = [new Date(`${dateString} ${year}`)];
	}
	return {
		name: e.name,
		type: e.type,
		year: e.year,
		dateString,
		activeDates,
		activeDateRange,
	};
};
