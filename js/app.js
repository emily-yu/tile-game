// Image Background Source: http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/09/Dark-Background-Images-9.jpg

console.log("Game Loaded!")

// JSON TO STORE
let button = new Array();

// FUNCTIONS
// CHANGES STATE TO OPPOSITE
function onClick(key){
	button[key]["state"] = !(button[key]["state"])
	let x = button[key]["associationValue"]
	console.log(x) 
	button[x-1]["state"] = !(button[x-1]["state"])
	// modifyCSS(key)
}

// CHANGE CSS BASED ON CLICKED OR NOT    
function modifyCSS(key) {
	let x = button[key]["associationValue"]
	if (button[x-1]["state"] = true) {
		documentButtons[key].setAttribute('style','background-color: #f2f2f2;')
	}
	else {
		documentButtons[key].setAttribute('style','background-color: #49A154;');
	}
}

// NEW BUTTON
function newButton (associationValue, state) {
	let toInsert = {
		"associationValue": associationValue,
		"state": state
	};  
	button.push(toInsert);  
}

// RANDOM ASSOCIATIONS
function roll() {
	let rand = documentButtons[Math.floor(Math.random() * numbArray.length)];
	let int = rand.textContent; // gets number inside
	return int - 1
}

// CHECK IF THE PLAYER HAS WON
let statesArray = []
function checkWin() {
	// get all the states
	for (let i = 0; i < counter; i += 1) {
		let states = button[i]['state'];
		statesArray.push(states)
	}
	console.log(statesArray)

	if (statesArray.every(didWin)) {
		console.log("ASJDLKFJKLDSJFKLSDAJF GOTEEM") // PRINTS WHEN YOU WIN WOOOOOOOOOOOO WE DID IT BOYYYYS
		winText.className += "fadeInText";
		winText.style = "visible"
	}
	statesArray.length = 0
	console.log(statesArray)
}

function didWin(parameter) {
    return parameter == true;
}

// GET THE OBJECTS
let documentButtons = document.getElementsByClassName('game-button');
let winText = document.getElementById('winText');
winText.style.visibility='hidden' 
let counter = documentButtons.length;

 // ARRAY WITH ALL BUTTON INDEXES
let numbArray = []
for (let i = 0; i < counter; i += 1) {
	numbArray.push(i + 1)
}

// ADD OBJECTS AND ASSIGN THEIR ASSOCIATIONS
for (let i = 0; i < counter; i += 1) {
	int = roll() // number to assign
	newButton(numbArray[int], false)
	numbArray.splice(int ,1);

	// changes state of button clicked
	documentButtons[i].addEventListener("click", function() {
    	console.log("you clicked");
		onClick((this.textContent)-1)
		console.log(JSON.stringify(button));
		checkWin()
	});
}

console.log(JSON.stringify(button)); // CURRENT JSON OBJECT
