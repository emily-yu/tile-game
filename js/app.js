// Image Background Source: http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/09/Dark-Background-Images-9.jpg

console.log("Game Loaded!")

// JSON TO STORE
let button = new Array();

// FUNCTIONS
let userInput = document.getElementById('userInput');
let createNew = document.getElementById('addButton');
createNew.addEventListener("click", function() {

	removeElementsByClass('game-button')
	button = new Array();
	// CLEAR BUTTON JSON THEN WE OUTTT

    if ((userInput.value%1) != 0 || userInput.value == "") {
        alert("Please input a number.");
        return false;
    }
    else {
        createButton(userInput.value)

		// GET THE OBJECTS
		let documentButtons = document.getElementsByClassName('game-button');
		let winText = document.getElementById('winText');
		winText.style.visibility='hidden' 
		let counter = documentButtons.length;
		console.log(documentButtons.length)

		 // ARRAY WITH ALL BUTTON INDEXES
		let numbArray = []
		for (let i = 0; i < counter; i += 1) {
			numbArray.push(i + 1)
		}

		// ADD OBJECTS AND ASSIGN THEIR ASSOCIATIONS
		for (let i = 0; i < counter; i += 1) {
			int = roll(documentButtons, numbArray) // number to assign
			newButton(numbArray[int], false)
			numbArray.splice(int ,1);

			// changes state of button clicked
			documentButtons[i].addEventListener("click", function() {
		    	console.log("you clicked");
				onClick((this.textContent)-1)
				console.log(JSON.stringify(button));
				checkWin(counter)
			});
		}

		console.log(JSON.stringify(button)); // CURRENT JSON OBJECT

    }
    
})

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function createButton(key) {
	for (let i = 0; i < key; i += 1) {
		var button1 = document.createElement('a')
	    button1.className += "btn btn-primary btn-xl game-button";
	    button1.setAttribute("style", "border-radius:0%; margin-top:5px; text-align: center; margin-left:5px");
	    button1.innerHTML = i +1;
	    document.getElementById("append").appendChild(button1); // this is working
	    console.log("same")
	    console.log(button1)
	}
}


// CHANGES STATE TO OPPOSITE
function onClick(key){
	button[key]["state"] = !(button[key]["state"])
	let x = button[key]["associationValue"]
	console.log(x) 
	button[x-1]["state"] = !(button[x-1]["state"])
	// modifyCSS(key)
}

// CHANGE CSS BASED ON CLICKED OR NOT    
function modifyCSS(key, documentButtons) {
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
function roll(documentButtons, numbArray) {
	let rand = documentButtons[Math.floor(Math.random() * numbArray.length)];
	let int = rand.textContent; // gets number inside
	return int - 1
}

// CHECK IF THE PLAYER HAS WON
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