const fs = require('node:fs');
const monster_data = require('./monsters.json');
const output_file = './index.html';

const monster_table = monster_data.map(({name, src}) => create_row(name, src)).join('');
let data = `<!DOCTYPE html>
<html>
<head>
	<script src="https://cdn.tailwindcss.com"></script>
	<script src="script.js"></script>
</head>
<body>
	<div class="max-w-md mx-auto">
		<h1 class="text-3xl font-bold"><span id="span1"></span>/<span id="span2"></span></h1>
		<table class="table-auto mb-4" id="mainTable">
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
</body>
</html>`;
fs.writeFile(output_file, data, function(err) { if(err) console.error(err); });
function create_row(name, src) {
	const name2 = name.replace(" ", "_");
	return `
				<tr class="hover:bg-slate-100">
					<td class="border px-4 py-2 text-center align-middle">${name}</td>
					<td class="border px-4 py-2"><img class="mx-auto" src="${src}"></td>
					<td class="border px-4 py-2 text-center align-middle"><input id="${name2}_Normal" type="checkbox"></td>
					<td class="border px-4 py-2 text-center align-middle"><input id="${name2}_Light" type="checkbox"></td>
					<td class="border px-4 py-2 text-center align-middle"><input id="${name2}_Dark" type="checkbox"></td>
				</tr>`;
}
