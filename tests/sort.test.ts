import { describe, expect, test } from 'bun:test';
import { byName } from '../src/lib/sort';

const items = [
	{ id: 1, name: 'Fox', type: 'feature', created: '' },
	{ id: 2, name: 'over', type: 'feature', created: '' },
	{ id: 3, name: 'brown', type: 'feature', created: '' },
	{ id: 4, name: 'jump', type: 'feature', created: '' },
	{ id: 5, name: 'fence', type: 'feature', created: '' },
];

const expected = [
	{ id: 3, name: 'brown', type: 'feature', created: '' },
	{ id: 5, name: 'fence', type: 'feature', created: '' },
	{ id: 1, name: 'Fox', type: 'feature', created: '' },
	{ id: 4, name: 'jump', type: 'feature', created: '' },
	{ id: 2, name: 'over', type: 'feature', created: '' },
];

describe('sorting', () => {
	test('sort names alphabetically', () => {
		expect(items.sort(byName)).toEqual(expected);
	});
});
