import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { timing } from 'hono/timing';
import { z } from 'zod';
import { renderer } from './renderer';
import { initalData } from './data';
import { byDate, byId, byName, bySolved, byType } from './lib/sort';
import { origin } from 'bun';
import { FugList } from './components/fug-list';

const app = new Hono();

let original = initalData;
let filtered = initalData;

app.use(logger());
app.use(timing());
app.use(renderer);

const AddSchema = z.string().regex(/^(feat:|bug:)/, {
	message: "Navn må starte med 'feat:' eller 'bug:'",
});

app.use('/public/*', serveStatic({ root: '.' }));

app.get('/', c => {
	return c.render(
		<table
			id='#fug-list'
			hx-get='/filter?f=all'
			hx-swap='outerHTML transition:true'
			hx-trigger='load'
		/>
	);
});

app.get('/sort', c => {
	const sortBy = c.req.query('sortBy');
	let sorted = [];

	switch (sortBy) {
		case 'id':
			sorted = [...filtered.sort(byId)];
		case 'name':
			sorted = [...filtered.sort(byName)];
		case 'type':
			sorted = [...filtered.sort(byType)];
		case 'created':
			sorted = [...filtered.sort(byDate)];
		case 'solved':
			sorted = [...filtered.sort(bySolved)];
		default:
			sorted = original;
	}

	return c.html(<FugList items={sorted} />);
});

app.get('/filter', c => {
	switch (c.req.query('f')) {
		case 'solved':
			filtered = [...original.filter(({ solved }) => !!solved)];
			return c.html(<FugList items={filtered} />);
		case 'unresolved':
			filtered = [...original.filter(({ solved }) => !solved)];
			return c.html(<FugList items={filtered} />);
		default:
			filtered = original;
			return c.html(<FugList items={filtered} />);
	}
});

app.get('/solved', c => {
	const id = c.req.query('id');

	if (!id) {
		return c.html(<FugList items={original} />);
	}

	const index = original.findIndex(item => item.id === Number(id));

	if (index === -1) {
		return c.html(<FugList items={original} />);
	}

	original = [
		...original.slice(0, index),
		{ ...original[index], solved: true },
		...original.slice(index + 1),
	];

	return c.html(<FugList items={original} />);
});

app.get('/add', c => {
	const nameQuery = AddSchema.safeParse(c.req.query('name'));

	if (!nameQuery.success) {
		return c.html(
			<>
				<p
					id='error'
					class='ml-auto p-2 text-sm rounded-md bg-yellow-400 text-yellow-800'
					hx-swap-oob='true'
					hx-swap='none'
				>
					Start with 'feat: something' or 'bug: something'
				</p>
				<FugList items={original} />
			</>
		);
	}

	const { data } = nameQuery;
	const [type, name] = data.split(':');

	switch (type) {
		case 'feat':
			if (name.trim() === '') {
				return c.html(<div />);
			}

			original.push({
				id: original.length + 1,
				type: 'feature',
				name: name.trim(),
				created: new Date().toISOString(),
				solved: false,
			});

			return c.html(<FugList items={original} />);

		case 'bug':
			if (name.trim() === '') {
				return c.html(<div />);
			}

			original.push({
				id: original.length + 1,
				type: 'bug',
				name: name.trim(),
				created: new Date().toISOString().split('.')[0],
				solved: false,
			});

			return c.html(<FugList items={original} />);
		default:
			return c.html(<div />);
	}
});

export default {
	port: 3001,
	fetch: app.fetch,
};