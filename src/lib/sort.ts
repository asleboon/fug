import { initalData } from '../data';
import { FugItem } from '../schema';

export const byName = (a: FugItem, b: FugItem) => {
	if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
	if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
	return 0;
};

export const byType = (a: FugItem, b: FugItem) => {
	if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
	if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
	return 0;
};

export const byId = (a: FugItem, b: FugItem) => {
	return a.id - b.id;
};

export const byDate = (a: FugItem, b: FugItem) => {
	return new Date(a.created).getTime() - new Date(b.created).getTime();
};

export const byResolved = (a: FugItem, b: FugItem) => {
	if (!a.resolved && b.resolved) return 1;
	if (a.resolved && !b.resolved) return -1;
	return 0;
};

export const sortFugList = (
	sortBy: string,
	items: typeof initalData,
	original: typeof initalData
) => {
	let sorted = [];
	switch (sortBy) {
		case 'id':
			sorted = [...items.sort(byId)];
			break;
		case 'name':
			sorted = [...items.sort(byName)];
			break;
		case 'type':
			sorted = [...items.sort(byType)];
			break;
		case 'created':
			sorted = [...items.sort(byDate)];
			break;
		case 'resolved':
			sorted = [...items.sort(byResolved)];
			break;
		default:
			sorted = original;
	}
	return sorted;
};
