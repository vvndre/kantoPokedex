'use strict'

document.addEventListener("DOMContentLoaded", () => {

  let generateBtn = document.querySelector('#generate-pokemon');
  generateBtn.addEventListener('click', renderEverything)

  getDeleteBtn().addEventListener('click', deleteEverything);
})

const renderEverything = () => {
  let allPokemonContainer = document.querySelector('#poke-container')
  allPokemonContainer.innerText = "";
  fetchKantoPokemon();

  getDeleteBtn().style.display = 'block'
}

const getDeleteBtn = () => {
  return document.querySelector('#delete-btn')
}

window.onload = function(){
  renderPokemon();
}

//fetch api
const fetchKantoPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
   .then(response => response.json())
   .then(function(allpokemon){
   allpokemon.results.forEach(function(pokemon){
     fetchPokemonData(pokemon); 
   })
  })
 }

 const fetchPokemonData = (pokemon) => {
  let url = pokemon.url
  fetch(url)
  .then(response => response.json())
  .then(function(pokeData){
      renderPokemon(pokeData)
  })
}

//html
const renderPokemon = (pokeData) => {
  let allPokemonContainer = document.getElementById('poke-container');
  let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
  pokeContainer.classList.add('ui', 'card');

  createPokeImage(pokeData.id, pokeContainer);

  let pokeName = document.createElement('h4') 
  pokeName.innerText = pokeData.name

  let pokeNumber = document.createElement('p')
  pokeNumber.innerText = `#${pokeData.id}`
 
  let pokeTypes = document.createElement('ul') //ul list will hold the pokemon types


  createTypes(pokeData.types, pokeTypes) // helper function to go through the types array and create li tags for each one

  pokeContainer.append(pokeName, pokeNumber, pokeTypes);   //appending all details to the pokeContainer div
  allPokemonContainer.appendChild(pokeContainer);       //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

const createTypes = (types, ul) =>{
  types.forEach(function(type){
      let typeLi = document.createElement('li');
      typeLi.innerText = type['type']['name'];
      ul.append(typeLi)
  })
}

const createPokeImage = (pokeID, containerDiv) => {
  let pokeImgContainer = document.createElement('div')
  pokeImgContainer.classList.add('image')

  let pokeImage = document.createElement('img')
  pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`

  pokeImgContainer.append(pokeImage);
  containerDiv.append(pokeImgContainer);
}

//delete button
const deleteEverything = (event) =>{
  event.target.style = 'none';
  let allPokemonContainer = document.querySelector('#poke-container')
  allPokemonContainer.innerText = ""

  let generateBtn = document.createElement('button')
  generateBtn.innerText = "Generate Pokemon"
  generateBtn.id = 'generate-pokemon'
  generateBtn.classList.add('ui', 'secondary', 'button')
  generateBtn.addEventListener('click', renderEverything);

  allPokemonContainer.append(generateBtn)
}