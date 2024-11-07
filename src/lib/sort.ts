import { initalData } from '../data';

type Item = (typeof initalData)[0];

export const byName = (a: Item, b: Item) => {
	if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
	if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
	return 0;
};

export const byType = (a: Item, b: Item) => {
	if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
	if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
	return 0;
};

export const byId = (a: Item, b: Item) => {
	return a.id - b.id;
};

export const byDate = (a: Item, b: Item) => {
	return new Date(a.created).getTime() - new Date(b.created).getTime();
};

export const bySolved = (a: Item, b: Item) => {
	if (!a.solved && b.solved) return 1;
	if (a.solved && !b.solved) return -1;
	return 0;
};
