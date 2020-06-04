var firebaseConfig = {
    apiKey: "AIzaSyBB4iR1P3WPy_rnyAbopEvnXuMXOUTqArE",
    authDomain: "test-19b1f.firebaseapp.com",
    databaseURL: "https://test-19b1f.firebaseio.com",
    projectId: "test-19b1f",
    storageBucket: "test-19b1f.appspot.com",
    messagingSenderId: "675345210798",
    appId: "1:675345210798:web:729bb520712d24873cfc3f"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var databaseReference = firebase.database().ref("messages2");
// var asd = databaseReference.push()
// asd.set({dupa: "dupa1123123"});

function writeHighscoreToDatabase() {
    firebase.database().ref("messages3/" + 123).set(
        {name: "dupa123",
    funkcja: "dupowanie"});
}

const buttonNewPlayer = document.querySelector(".button_newplayer");
const formNewPlayer = document.querySelector(".form_newplayer")
const mainContainer = document.querySelector("main");
const playersContainer = document.querySelector(".players-container");

buttonNewPlayer.addEventListener("click", insertNewPlayerElement);

//let buttonNewPlayerName = document.querySelector(".button_newplayername");


var playersQuantity = 0;
var playersDict = {}

function insertNewPlayerElement() {
    let newPlayerElement = createNewPlayerElement()
    playersContainer.appendChild(newPlayerElement);
    if (playersQuantity == 4) 
    {
      mainContainer.removeChild(formNewPlayer)
    }
    console.log(document)
}

function createNewPlayerElement() {
    playersQuantity++;
    // create container div for player
    let newPlayerDiv = document.createElement("div");
    let playerNumberId = "player" + playersQuantity;
    newPlayerDiv.className = `player ${playerNumberId}`
    // create form for player name
    let playerForm = document.createElement("form");
    // playerForm.setAttribute("action", "javascript:void(0);")
    playerForm.className = `form_playername form_playername${playerNumberId}`
    newPlayerDiv.appendChild(playerForm);
    // create text input element
    let label = document.createElement("label");
    label.textContent = "Player name";
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.className = "input_playername";
    // create submit button
    let formButton = document.createElement("button");
    formButton.className = `button_newplayername${playersQuantity}`;
    formButton.textContent = "SUBMIT";
    // add event listener for button
    formButton.addEventListener("click", setPlayerNameAndCreateHighScoreForm);
    playerForm.appendChild(label);
    playerForm.appendChild(inputElement);
    playerForm.appendChild(formButton);
    return newPlayerDiv;
}

function setPlayerNameAndCreateHighScoreForm(event) {

    let inputPlayerName = event.target.parentNode.querySelector(".input_playername");

    let playerDiv = event.target.parentNode.parentNode
    // let headerPlayerName = event.target.parentNode.parentNode.querySelector("h2");

    let h2 = document.createElement("h2");
    h2.classname = "title"
    if (inputPlayerName.value == "")
    {   
        event.preventDefault();
        return;
    }
    // Write text content of player name input to just created header element
    // and add new player to dict
    h2.textContent = inputPlayerName.value;
    playersDict[inputPlayerName.value] = ""
    console.log(playersDict)
    // PRZEZ TAKIE CONSOLE GOWNO ODSWIEZALA MI SIE STRONA, MIMO ZE TEGO NIE CHCIALEM
    //  console.log(playersDict)
    // remove player name form
    let formNode = event.target.parentNode;
    playerDiv.removeChild(formNode);
    playerDiv.appendChild(h2);

    // create form for game highscore
    let formMoves = document.createElement("form");
    formMoves.setAttribute("action", "javascript:void(0);");
    formMoves.className = "form_moves";
    // create textarea input for highscore/player moves
    let inputMoves = document.createElement("textarea");
    inputMoves.className = "input_moves";
    
    inputMoves.placeholder = `Type ${h2.textContent}'s moves' values here `;
    formMoves.appendChild(inputMoves);
    // create submit button
    let buttonMoves = document.createElement("button");
    buttonMoves.className = "button_moves";
    buttonMoves.textContent = "SUBMIT";
    buttonMoves.addEventListener("click", processPlayerHighscore);
    formMoves.appendChild(buttonMoves);
    playerDiv.appendChild(formMoves);
    console.log(document);
}

function processPlayerHighscore(event) {
    var numbersString = event.target.parentNode.parentNode.querySelector(".input_moves").value;
    console.log(numbersString)
    numbersString = numbersString.replace(/,/g, " ");
    
    var movesDict = {};
    var numbersCount = 0;
    while(numbersString != "")
    { 
      console.log("poczatek petli");
      console.log(numbersString)
      numbersCount++;
      var regex1 = /^[0-9]+\s+/
      var regex2 = /^[0-9]+/
      if (numbersString.match(/\s/g))
      {
        var firstNumber = numbersString.match(regex1)
        var numbersString = numbersString.replace(firstNumber, "");
      }
      else 
      {
        var firstNumber = numbersString.match(regex2)
        var numbersString = numbersString.replace(firstNumber, "");
      }

      var firstNumberWithoutWhiteSpace = firstNumber[0].replace(/\s/g, "")
      movesDict[numbersCount] = firstNumberWithoutWhiteSpace
      console.log(movesDict)
      console.log(numbersString)     
    }

    var playerName = event.target.parentNode.parentNode.querySelector("h2").textContent
    playersDict[playerName] = movesDict
    console.log(playersDict)
    createHighscore(event.target.parentNode.parentNode, movesDict);

    
}

function createHighscore(parent, movesDict) {
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("highscore_container");
    for(i=1; i <= Object.keys(movesDict).length; i++){
      var div = document.createElement("div");
      div.classList.add("move_div");
      var p1 = document.createElement("p");
      p1.classList.add("p1");
      p1.textContent = `${i}`;
      var p2 = document.createElement("p");
      p2.classList.add("p2");
      p2.textContent = `${movesDict[i]}`
      div.appendChild(p1);
      div.appendChild(p2);

      containerDiv.appendChild(div);

    }
    parent.appendChild(containerDiv);
}