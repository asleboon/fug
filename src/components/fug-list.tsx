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
						class='px-2 py-1'
					>
						#
					</th>
					<th
						hx-get='/sort?sortBy=name'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
					>
						Navn
					</th>
					<th
						hx-get='/sort?sortBy=type'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
					>
						Type
					</th>
					<th
						hx-get='/sort?sortBy=created'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
					>
						Created
					</th>
					<th
						hx-get='/sort?sortBy=solved'
						hx-target='#fug-list'
						hx-swap='outerHTML transition:true'
					>
						Solved?
					</th>
				</tr>
			</thead>
			<tbody>
				{items.map(({ id, name, type, created, solved }) => (
					<tr class='border px-4 border-2 text-lg text-left text-primary font-bold border-primary hover:bg-primary hover:text-backgroundColor'>
						<th class='px-2 py-1'>{id}</th>
						<td>{name}</td>
						<td>{type}</td>
						<td>{created.split('Z')[0]}</td>

						<td>
							<input
								type='checkbox'
								checked={solved}
								hx-get={`/solved?id=${id}`}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
