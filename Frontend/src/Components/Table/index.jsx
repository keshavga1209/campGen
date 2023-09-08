function TableRow({ rowData }) {
	return (
		<tr>
			{rowData.map((e, i) => (
				<td
					className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
					key={i}>
					{e}
				</td>
			))}
		</tr>
	);
}

function TableHead({ headings }) {
	return (
		<thead>
			<tr>
				{headings.map((e, i) => (
					<th
						className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
						key={i}>
						{e}
					</th>
				))}
			</tr>
		</thead>
	);
}

export default function Table({ data }) {
	// args:
	//    data: Object {
	//        headings: Array<String>,
	//        Rows: Array<Array<ReactElement>>
	//    }

	return (
		<div className="bg-white p-4 mt-4 rounded-lg">
			<div className="mb-4 flex sm:flex-row flex-col justify-between">
				<div className="flex flex-row mb-1 sm:mb-0 items-center gap-2">
					<span> Show </span>
					<div className="relative">
						<select className="h-full rounded-lg bg-gray-300 block appearance-none w-[4rem] border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-gray-500">
							<option>5</option>
							<option>10</option>
							<option>20</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
							<svg
								className="fill-current h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
					<span> entries </span>
				</div>
				<div className="block relative">
					<span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
						<svg
							viewBox="0 0 24 24"
							className="h-4 w-4 fill-current text-gray-500">
							<path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
						</svg>
					</span>
					<input
						placeholder="Search"
						className="appearance-none rounded-lg bg-gray-200 block pl-8 pr-6 py-2 w-full text-sm placeholder-gray-400 text-gray-700 focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
					/>
				</div>
			</div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<TableHead headings={data.headings} />
						<tbody>
							{data.rows.map((e, i) => (
								<TableRow rowData={e} key={i} />
							))}
						</tbody>
					</table>
					<div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span className="text-xs xs:text-sm text-gray-900">
							Showing 1 to 4 of 50 Entries
						</span>
						<div className="inline-flex mt-2 xs:mt-0">
							<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
								Prev
							</button>
							<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
