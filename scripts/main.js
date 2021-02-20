/*eslint no-console: 0 */
"use strict";

// takes a string and adds it to the div with id "tables".
function addToTables(data) {
	//get the div where the tables should be.
	const tables = document.getElementById("tables");
	tables.innerHTML = data;
}

//makes the inner html of the body of the table
function createBody(nextTable, characters){
	//this will contain the body innerHtml for the next table
	let body = "";
	//the start of the characters inside the array
	let start = nextTable * 32;
	// the las character to be in the table
	const finish = start + 31;

	//loops inside the characters the table needs from the array
	while(start<=finish && start < characters.length){
		//the current char to add in the table
		const curChar = characters[start];

		//get the information of the current character using object destructuring
		const { DEC, HEX, Description } = curChar;
		let Char = curChar.Char

		Char = Char.replace("<","&#60;").replace(">","&#62;");

		body += (`<tr>
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
		</tr>`);

		//moves to next character
		++start;
	}

	//returns the inner html of the body of the table
	return body;
}

//makes the inner html of the next table into the div
function createATable(nextTable, characters){
	

	return (`<table>
	<thead>
		<tr>
			<th>DEC</th>
			<th>HEX</th>
			<th>Char</th>
			<th class='hDesc'>Description</th>
		</tr>
	</thead>
	<tbody>
		${createBody(nextTable, characters)}
	</tobdy>
	</table>`);
}


//create the inner html for the tables.
function createTables(num, characters){
	//the inner html to add on the tables.
	let tablas = "";

	for(let i = 0; i<= num; i++) {
		tablas += createATable(i,characters);
	
	}
	//sends the inner html for the div where the tables will be.
	addToTables(tablas);
}

//once the json is loaded, takes the objects and updates the content of the div
function updateDivs(characters){
	const tam = characters.length;
	const numTables = tam/32 - 1; // chars from 0 to n means that n/32 -1 tables need to be created.
	createTables(numTables, characters);
}

// route to JSON data.
const json = "data/unicode255.json";
fetch(json)
	.then((data) => data.json())
	.then((characters) => updateDivs(characters))
	.catch(error => console.log(error));