import { FC } from 'hono/jsx';
import { initalData } from './../data';

export const FugList: FC<{ items: typeof initalData }> = ({ items }) => {
	return (
		<table id='fug-list'>
			<thead>
				<tr class='border border-2 text-lg text-left text-primary font-bold border-primary'>
					<th
						hx-get='/sort?sortBy=id'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
						class='text-xs md:text-lg px-2 py-1'
					>
						#
					</th>
					<th
						hx-get='/sort?sortBy=name'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
						class='text-xs md:text-lg'
					>
						Navn
					</th>
					<th
						hx-get='/sort?sortBy=type'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
						class='text-xs md:text-lg'
					>
						Type
					</th>
					<th
						hx-get='/sort?sortBy=created'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
						class='text-xs md:text-lg'
					>
						Created
					</th>
					<th
						hx-get='/sort?sortBy=resolved'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
						class='text-xs md:text-lg'
					>
						Resolved?
					</th>
				</tr>
			</thead>
			<tbody>
				{items.map(({ id, name, type, created, resolved }) => (
					<tr class='border px-4 border-2 text-lg text-left text-primary font-bold border-primary hover:bg-primary hover:text-backgroundColor'>
						<th class='text-xs md:text-lg px-2 py-1'>{id}</th>
						<td class='text-xs md:text-lg'>{name}</td>

						<td class='text-xs md:text-lg'>{type}</td>
						<td class='text-xs md:text-lg'>
							{created.split('Z')[0]}
						</td>

						<td>
							<input
								type='checkbox'
								checked={resolved}
								hx-get={`/resolved?id=${id}`}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
