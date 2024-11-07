import { jsxRenderer } from 'hono/jsx-renderer';

// Use renderer as middleware to set layout ( also use c.render to use it )
export const renderer = jsxRenderer(({ children }) => {
	return (
		<html lang='en'>
			<head>
				<meta charset='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				<script src='https://cdn.tailwindcss.com'></script>
				<script
					src='https://unpkg.com/htmx.org@2.0.3'
					integrity='sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq'
					crossorigin='anonymous'
				></script>

				<title>FUG</title>
			</head>
			<body class='flex w-full h-screen p-8'>
				<main class='flex w-full flex-col gap-2 p-8'>
					<h1 class='font-bold text-4xl'>
						FUG<span class='text-xs'>Feature / bug list</span>
					</h1>
					<div class='flex gap-4 items-center'>
						<input
							id='new-item'
							class='p-2 border border-gray-200 rounded-md w-[20vw]'
							name='name'
							hx-get='/add'
							hx-swap='outerHTML transition:true'
							hx-target='#fug-list'
							type='text'
							placeholder='bug: ...'
						/>
						<button class='bg-blue-500 text-blue-100 px-4 py-2 rounded-md'>
							Legg til
						</button>
						<form class='flex gap-2'>
							<label class='flex gap-1'>
								All
								<input
									type='radio'
									name='f'
									value='all'
									hx-get='/filter'
									hx-target='#fug-list'
									hx-swap='outerHTML transition:true'
								/>
							</label>
							<label class='flex gap-1'>
								Solved
								<input
									type='radio'
									name='f'
									value='solved'
									hx-get='/filter'
									hx-target='#fug-list'
									hx-swap='outerHTML transition:true'
								/>
							</label>
							<label class='flex gap-1'>
								Unresolved
								<input
									type='radio'
									name='f'
									value='unresolved'
									hx-get='/filter'
									hx-target='#fug-list'
									hx-swap='outerHTML transition:true'
								/>
							</label>
						</form>

						<p class='ml-auto' id='error'></p>
					</div>
					{children}
				</main>
				<footer>
					<p></p>
				</footer>
			</body>
		</html>
	);
});
