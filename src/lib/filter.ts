import { FugItem } from '../schema';

export const filterFugList = (filterBy: string, original: FugItem[]) => {
	let filtered = [];
	switch (filterBy) {
		case 'resolved':
			filtered = [...original.filter(({ resolved }) => !!resolved)];
			break;
		case 'unresolved':
			filtered = [...original.filter(({ resolved }) => !resolved)];
			break;
		default:
			filtered = original;
	}

	return filtered;
};
