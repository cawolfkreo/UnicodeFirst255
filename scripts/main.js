/*eslint no-console: 0 */
"use strict";

// takes a string and adds it to the div with id "tables".
function addToTables(data) {
	//get the div where the tables should be.
	let tables = document.getElementById("tables");
	tables.innerHTML = data;
}

//makes the inner html of the body of the table
function createBody(nextTable, caracteres){
	//this will contain the body innerHtml for the next table
	let body = "";
	//the start of the characters inside the array
	let start = nextTable * 32;
	// the las character to be in the table
	let finish = start + 31;

	//loops inside the characters the table needs from the array
	while(start<=finish && start < caracteres.length){
		//the current char to add in the table
		const curChar = caracteres[start];
		//get the information of the current character using object destructuring
		let {DEC, HEX, Char, Description} = curChar;
		Char = Char.replace("<","&#60;").replace(">","&#62;");
		body += `<tr>
				<td class='dec'>
				${DEC}
				</td>
				<td class='hex'>
				${HEX}
				</td>
				<td class='char'>
				${Char}
				</td>
				<td class='desc'>
				${Description}
				</td>
			</tr>`;
		//moves to next character
		start++;
	}

	//returns the inner html of the body of the table
	return body;
}

//makes the inner html of the next table into the div
function createATable(nextTable, caracteres){
	

	return `<table>
	<thead>
		<tr>
			<th>DEC</th>
			<th>HEX</th>
			<th>Char</th>
			<th class='hDesc'>Description</th>
		</tr>
	</thead>
	<tbody>
		${createBody(nextTable, caracteres)}
	</tobdy>
	</table>`;
}


//create the inner html for the tables.
function createTables(num, caracteres){
	//the inner html to add on the tables.
	let tablas = "";

	for(let i = 0; i<= num; i++){
		tablas += createATable(i,caracteres);
	
	}
	//sends the inner html for the div where the tables will be.
	addToTables(tablas);
}

//once the json is loaded, takes the objects and updates the content of the div
function updateDivs(caracteres){
	const tam = caracteres.length;
	const numTables = tam/32 - 1; // chars from 0 to n means that n/2 -1 tables need to be created
	window.prueba = caracteres;
	createTables(numTables, caracteres);
}

// ruta al json.
const json = "data/unicode255.json";
fetch(json)
	.then((data) => data.json())
	.then((caracteres) => updateDivs(caracteres))
	.catch(error => console.log(error));