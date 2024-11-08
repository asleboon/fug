import { z } from 'zod';

export const SortBySchema = z.object({
	sortBy: z.enum(['id', 'name', 'type', 'created', 'resolved']),
});

export const FilterBySchema = z.object({
	filterBy: z.enum(['all', 'resolved', 'unresolved']),
});

export const FugItemSchema = z.object({
	id: z.number(),
	type: z.enum(['feature', 'bug']),
	name: z.string().max(256, 'ARE YOU MAD?'),
	created: z.string(),
	resolved: z.boolean(),
});

export type FugItem = z.infer<typeof FugItemSchema>;
