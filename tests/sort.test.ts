import { describe, expect, test } from 'bun:test';
import { byName } from '../src/lib/sort';

const items = [
	{ id: 1, name: 'Fox', type: 'feature', created: '', solved: false },
	{ id: 2, name: 'over', type: 'feature', created: '', solved: false },
	{ id: 3, name: 'brown', type: 'feature', created: '', solved: false },
	{ id: 4, name: 'jump', type: 'feature', created: '', solved: false },
	{ id: 5, name: 'fence', type: 'feature', created: '', solved: false },
];

const expected = [
	{ id: 3, name: 'brown', type: 'feature', created: '', solved: false },
	{ id: 5, name: 'fence', type: 'feature', created: '', solved: false },
	{ id: 1, name: 'Fox', type: 'feature', created: '', solved: false },
	{ id: 4, name: 'jump', type: 'feature', created: '', solved: false },
	{ id: 2, name: 'over', type: 'feature', created: '', solved: false },
];

describe('sorting', () => {
	test('sort names alphabetically', () => {
		expect(items.sort(byName)).toEqual(expected);
	});
});
