const fs = require('node:fs');
const monster_data = require('./monsters.json');
const output_file = './index.html';

const monster_table = monster_data.map(({name, src}) => create_row(name, src)).join('');
let data = `<!doctype html>
<head>
	<script src="https://cdn.tailwindcss.com"></script>
	<script src="script.js"></script>
	<style>
		td {
			text-align: center;
			vertical-align: middle;
		}
		img {
			margin-left: auto;
			margin-right: auto;
		}
		table {
			margin-bottom: 1rem;
		}
	</style>
</head>
<body>
	<div class="max-w-md mx-auto">
		<h1 class="text-3xl font-bold"><span id="span1"></span>/<span id="span2"></span></h1>
		<table class="table-auto" id="mainTable">
			<thead>
				<tr>
					<th class="px-4 py-2">Name</th>
					<th class="px-4 py-2">Image</th>
					<th class="px-4 py-2">Normal</th>
					<th class="px-4 py-2">Light</th>
					<th class="px-4 py-2">Dark</th>
				</tr>
			</thead>
			<tbody>${monster_table}
			</tbody>
		</table>
	</div>
</body>`;
fs.writeFile(output_file, data, function(err) { if(err) console.error(err); });
function create_row(name, src) {
	const name2 = name.replace(" ", "_");
	return `
				<tr class="hover:bg-slate-100">
					<td class="border px-4 py-2">${name}</td>
					<td class="border px-4 py-2"><img src="${src}"</td>
					<td class="border px-4 py-2"><input id="${name2}_Normal" type="checkbox"></td>
					<td class="border px-4 py-2"><input id="${name2}_Light" type="checkbox"></td>
					<td class="border px-4 py-2"><input id="${name2}_Dark" type="checkbox"></td>
				</tr>`;
}
