// Image Background Source: http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/09/Dark-Background-Images-9.jpg

console.log("Game Loaded!")

let button = new Array();
let userInput = document.getElementById('userInput'); // user's number of buttons
let createNew = document.getElementById('addButton'); // create new game buttons
createNew.addEventListener("click", function() { // adds the buttons
	removeElementsByClass('game-button')	// remove any previous game buttons
	button = new Array();	// clear tracking array

	// checks to make sure that userInput is a number, not a String
    if ((userInput.value%1) != 0 || userInput.value == "") {
        alert("Please input a valid number.");
        return false;
    }
    else {
    	// create buttons from 1 to userInput
        createButton(userInput.value)

		// get all the buttons
		let documentButtons = document.getElementsByClassName('game-button');
		let winText = document.getElementById('winText');
		winText.style.visibility='hidden' 
		let counter = documentButtons.length;
		console.log(documentButtons.length)

		 // stores the button indexes
		let numbArray = []
		for (let i = 0; i < counter; i += 1) {
			numbArray.push(i + 1)
		}

		// add objects to the tracking system
		for (let i = 0; i < counter; i += 1) {
			int = roll(documentButtons, numbArray) // number to assign
			newButton(numbArray[int], false)
			numbArray.splice(int,1);

			// changes state of button clicked
			documentButtons[i].addEventListener("click", function() {
				onClick((this.textContent)-1)
				console.log(JSON.stringify(button));
				checkWin(counter)
			});
		}
		console.log(JSON.stringify(button)); // prints to console the true-false status
    }
})

// remove elements with class className
function removeElementsByClass(className){
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// create buttons from 1 to key
function createButton(key) {
	for (let i = 0; i < key; i += 1) {
		let button1 = document.createElement('a')
	    button1.className += "btn btn-primary btn-xl game-button";
	    button1.setAttribute("style", "border-radius:0%; margin-top:5px; text-align: center; margin-left:5px");
	    button1.innerHTML = i +1;
	    document.getElementById("append").appendChild(button1);
	}
}

// change state of button 'key' to the opposite of what it is
function onClick(key){
	button[key]["state"] = !(button[key]["state"])
	let x = button[key]["associationValue"]
	console.log(x) 
	button[x-1]["state"] = !(button[x-1]["state"])
}

// create a new button in tracking system
function newButton (associationValue, state) {
	let toInsert = {
		"associationValue": associationValue,
		"state": state
	};  
	button.push(toInsert);  
}

// create random associations
function roll(documentButtons, numbArray) {
	let rand = documentButtons[Math.floor(Math.random() * numbArray.length)];
	let int = rand.textContent; // gets number inside
	return int - 1
}

// check to see if the player has won
let statesArray = []
function checkWin(counter) {
	// get all the states
	for (let i = 0; i < counter; i += 1) {
		let states = button[i]['state'];
		statesArray.push(states)
	}
	console.log(statesArray)

	if (statesArray.every(didWin)) {
		winText.className += "fadeInText";
		winText.style = "visible"
	}
	statesArray.length = 0
	console.log(statesArray)
}
function didWin(parameter) {
    return parameter == true;
}