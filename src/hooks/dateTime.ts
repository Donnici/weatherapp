import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

export const useCurrentDateTime = (): string => {
	const [currentDate, setCurrentDate] = useState<string>('');

	const getDayName = () => {
		const name = format(new Date(), 'EEEE HH:mm', { locale: ptBr }).replace('-feira', '');
		return `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;
	};

	useEffect(() => {
		const newCurrentDate = getDayName();
		setCurrentDate(newCurrentDate);
		const intervalID = setInterval(() => {
			const newCurrent = getDayName();
			setCurrentDate(newCurrent);
		}, 60000);
		return () => {
			clearInterval(intervalID);
		};
	}, []);

	return currentDate;
};
