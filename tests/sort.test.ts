import { describe, expect, test } from 'bun:test';
import { sortFugList } from '../src/lib/sort';
import { FugItem } from '../src/schema';

const items: FugItem[] = [
	{ id: 1, name: 'Fox', type: 'feature', created: '', resolved: false },
	{ id: 2, name: 'over', type: 'feature', created: '', resolved: false },
	{ id: 3, name: 'brown', type: 'feature', created: '', resolved: false },
	{ id: 4, name: 'jump', type: 'feature', created: '', resolved: false },
	{ id: 5, name: 'fence', type: 'feature', created: '', resolved: false },
];

const expected: FugItem[] = [
	{ id: 3, name: 'brown', type: 'feature', created: '', resolved: false },
	{ id: 5, name: 'fence', type: 'feature', created: '', resolved: false },
	{ id: 1, name: 'Fox', type: 'feature', created: '', resolved: false },
	{ id: 4, name: 'jump', type: 'feature', created: '', resolved: false },
	{ id: 2, name: 'over', type: 'feature', created: '', resolved: false },
];

describe('sorting', () => {
	test('sort names alphabetically', () => {
		expect(sortFugList('name', items, items)).toEqual(expected);
	});
});
