import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { timing } from 'hono/timing';
import { z } from 'zod';
import { renderer } from './renderer';
import { initalData } from './data';
import { sortFugList } from './lib/sort';
import { FugList } from './components/fug-list';
import { customLogger } from './middleware/pino-logger';
import { zValidator } from '@hono/zod-validator';
import { FilterBySchema, SortBySchema } from './schema';
import { filterFugList } from './lib/filter';

const app = new Hono();

let original = initalData;
let filtered = initalData;

app.use(logger());
app.use(timing());
app.use(renderer);
app.use(customLogger());

app.get('/', c => {
	return c.render(
		<table
			id='#fug-list'
			hx-get='/sort?sortBy=type'
			hx-swap='outerHTML transition:true'
			hx-trigger='load'
		/>
	);
});

app.get('/sort', zValidator('query', SortBySchema), c => {
	const { sortBy } = c.req.valid('query');
	const sorted = sortFugList(sortBy, filtered, original);
	return c.html(<FugList items={sorted} />);
});

app.get('/filter', zValidator('query', FilterBySchema), c => {
	const { filterBy } = c.req.valid('query');
	filtered = filterFugList(filterBy, original);
	return c.html(<FugList items={filtered} />);
});

app.get('/resolved', c => {
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
		{ ...original[index], resolved: true },
		...original.slice(index + 1),
	];

	return c.html(<FugList items={original} />);
});

const AddSchema = z.string().regex(/^(feat |bug )/, {
	message: "Starte med 'feat ...' eller 'bug ...'",
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
					Start med 'feat ...' eller 'bug ...'
				</p>
				<FugList items={original} />
			</>
		);
	}

	const { data } = nameQuery;
	const [type, ...rest] = data.split(' ');
	const name = rest.join(' ');

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
				resolved: false,
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
				resolved: false,
			});

			return c.html(<FugList items={original} />);
		default:
			return c.html(<div />);
	}
});

export default {
	port: 3033,
	fetch: app.fetch,
};
