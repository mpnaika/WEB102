/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/
// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
/**
 * How many times will this loop run when it is called with the argument GAMES_JSON
 *  11
 * What would the output of the following code segment be?
 *  The answer to ${x} + ${y} is ${x + y} (keyword: seafoam)
 * Which variable was passed to addGamesToPage in order to add all the games to the page?
 *  GAMES_JSON
 * 11seafoamGAMES_JSON
 */
// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let game in games) {
        // create a new div element, which will become the game card
        let divider = document.createElement("div")
        // add the class game-card to the list
        divider.className = "game-card"
        let gameImgClass = "game-img"
        // set the inner HTML using a template literal to display some info 
        // about each game
        divider.innerHTML = `
        <img src="${games[game].img}" class="${gameImgClass}"/>
        <p>${games[game].name}</p>
        <p>${games[game].description}</p>
        `;
        // append the game to the games-container
        gamesContainer.appendChild(divider)
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
// addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
/**
 * What value is now displayed under the Individual Contributions heading?
 *  19187
 * What value is now displayed under the Total Raised heading?
 *  800268
 * Identify the error in this code segment
 *  The arrow function does not add sum and animal.charAt(0), so it will return only "c" (keyword: BRAIN)
 * 19187800268BRAIN
 */
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.backers
},0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString('en-US')

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, GAMES_JSON) => {
    return acc + GAMES_JSON.pledged
},0)
// set inner HTML using template literal
raisedCard.innerHTML = totalRaised

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length
gamesCard.innerHTML = totalGames


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
/**
 * How many games are in the array returned by filterUnfundedOnly?
 *  7
 * How many games are in the array returned by filterFundedOnly?
 *  4
 * What would happen if the deleteChildElements function was never called within the three event handlers you wrote?
 *  The buttons would always add their list of games to the games already displayed, creating a growing list of games. (keyword: FLANNEL)
 * Which type of event does each button listen for?
 *  click
 * 74FLANNELclick
 */
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter( game => game.pledged < game.goal)

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter( game => game.pledged >= game.goal)

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded)
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
/**
 * Which function adds correct commas and punctuation to a number, e.g. displaying as ? 
 *  toLocaleString
 * What is the opening tag of the HTML element you appended your newly created <p> element to?
 *  <div>
 * Which option would correctly display "Hello {name}" if a user is logged in, and simply "Hello!" if the user is not logged in?
 *  (keyword: 1)
 * What does the following code segment return when called with `true`
 *  $2.00 (keyword: IVY)
 */
// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfunded = GAMES_JSON.filter( game => game.pledged < game.goal)

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of ${totalRaised} has been raised for ${GAMES_JSON.length} games. Currently, ${unfunded.length} game${unfunded.length > 1 ? "s" : ""} remains underfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
let p = document.createElement("p")
p.innerHTML = displayStr
descriptionContainer.appendChild(p)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
/**
 * What is the first word of the most funded game?
 *  Zoo
 * What is the first word of the second most funded game?
 *  How
 * What is the value of ...rest in the following code segment?
 *  [3, 4, 5, 6] (keyword: CEDAR)
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
var first, second, rest;
// use destructuring and the spread operator to grab the first and second games
[first, second, ...rest] = sortedGames
console.error(first.name)
console.error(second.name)
console.log(rest)

// create a new element to hold the name of the top pledge game, then append it to the correct element
p = document.createElement("p")
p.innerHTML = first.name
firstGameContainer.appendChild(p)
// do the same for the runner up item
p = document.createElement("p")
p.innerHTML = first.name
secondGameContainer.appendChild(p)
