//IIFE - Immeditaly Invoked Function Expression --> (function() {})();
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  /* Load pokemon from the api thru http's fetch method and Promise class */
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
      /*console.log(json.results); array of objects for JS generated */
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function showLoadingMessage() {
    $ul.classList.add('load');
    $h2.innerText = 'Loading Pokemon...';
  }

  function hideLoadingMessage() {
    $ul.classList.remove('load');
    $h2.innerText = 'Pokedex';
  }

  /* Add the loaded pokemons to our repository */
  function add(pokemon) {
    repository.push(pokemon);
  }

  /* get all the pokemons from our repository */
  function getAll(){
    return repository;
  }

  /* DOM - Document Object Model - Add all the pokemons name alone from the repository to the html list */
  function addListItem(pokemon) {
    /* To create 'li' element */
    var listItemElement = document.createElement('li');
    /* To create 'button' element */
    var buttonElement = document.createElement('button');
    /* To add innertext to button element */
    buttonElement.innerText = pokemon.name;
    buttonElement.classList.add('newButton');
    /* To append button element to list */
    listItemElement.appendChild(buttonElement);
    /* To append 'li'st element as a child 'ul' element */
    $ul.appendChild(listItemElement);
    buttonElement.addEventListener('click', function(event){
      showDetails(event,pokemon);
    });
  }

  /* show details of the specific pokemon that is clicked by the user */
  function showDetails(event, pokemon) {
    /* To add or remove 'button' class */
    event.target.classList.toggle('button');
    /* To add or remove 'newButton' class */
    event.target.classList.toggle('newButton');
    /* var $target = event.target */
    if (event.target.classList.contains('newButton')) {
      event.target.innerText = pokemon.name;
    } else {
      console.log(pokemon.name + ' says hi there!');
      event.target.innerText = 'Hi There!';
    }
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  /* To load details of each pokemon */
  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
        // console.log(details); would print particular pokemon (object)'s detail
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height= details.height;
        pokemon.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    })
  }

  return {
    loadList: loadList,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadDetails: loadDetails
  };
})();

var $ul = document.querySelector('ul');
var $h2 = document.querySelector('h2');

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

/* Intentionally delayed in order to show the Loading message */
setTimeout(function(){pokemonRepository.hideLoadingMessage()},1299);
