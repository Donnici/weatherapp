import { isAfter, isBefore, setHours, setMinutes } from 'date-fns';

export const defineBackground = (): string => {
	const now = new Date();
	const startMorning = setMinutes(setHours(now, 5), 30);
	const startNight = setMinutes(setHours(now, 18), 0);

	if (isBefore(now, startMorning) || isAfter(now, startNight)) {
		return '#232129';
	}
	return '#87ceeb';
};

export const defineTextColor = (): string => {
	const now = new Date();
	const startMorning = setMinutes(setHours(now, 5), 30);
	const startNight = setMinutes(setHours(now, 18), 0);

	if (isBefore(now, startMorning) || isAfter(now, startNight)) {
		return '#f4ede8';
	}
	return '#232129';
};

export const colors = {
	primary: '#000000',

	background: defineBackground(),
	backgroundDark: '#232129',
	backgroundLight: '#f4ede8',
	text: defineTextColor()
};

export type Colors = typeof colors;
