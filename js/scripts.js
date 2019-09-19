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
      var url = pokemon.detailsUrl; // https://pokeapi.co/api/v2/pokemon/1/ --> Sample
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
          // console.log(details); would print particular pokemon (object)'s detail
          pokemon.imageUrl = details.sprites.front_shiny;
          pokemon.height= details.height;
          pokemon.weight=details.weight;
    /* Function call to display modal */
          showModal(event, pokemon);
          // pokemon.types = Object.keys(details.types);
      }).catch(function(e) {
        console.error(e);
      })
    }

  function showModal(event, pokemon){
      var listElement = event.target.parentElement;

      var modalContainer = document.createElement('div');
      modalContainer.id = 'modal-container';
      modalContainer.classList.add('is-visible');

      var modal = document.createElement('div');
      modal.classList.add('modal');

      var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'X';
      closeButtonElement.addEventListener('click', hideModal);

      var img = document.createElement('img');
      img.src = pokemon.imageUrl;
      img.alt = `${pokemon.name}'s Image`;

      var titleElement = document.createElement('h2');
      titleElement.innerText = `I'm ${pokemon.name} !`;

      var textElement = document.createElement('p');
      textElement.innerText = `My height & weight are ${pokemon.height/10} m & ${pokemon.weight/10} kg.` ;

      modal.appendChild(closeButtonElement);
      modal.appendChild(img);
      modal.appendChild(titleElement);
      modal.appendChild(textElement);
      modalContainer.appendChild(modal);
      listElement.appendChild(modalContainer);
  }

/* To close the poped up modal that has pokemon's details */
  function hideModal() {
    if (document.querySelector('#modal-container').classList.contains('is-visible')) {
      var $elementToRemove = document.querySelector('#modal-container');
      /* To remove the #modal-container's element and all its children */
      $elementToRemove.parentElement.removeChild($elementToRemove);
    }
  }

/* To close the poped up modal that has pokemon's details thru escape key in the keyboard */
  window.addEventListener('keydown',(e) => {
    if ( e.key === 'Escape' && (document.querySelector('#modal-container'))) {
      hideModal();
    }
  });

/* To close the poped up modal that has pokemon's details clicking on anywhere on the screen */
 document.querySelector('body').addEventListener('click', (e) => {
   if (e.target === document.querySelector('#modal-container') ) {
     hideModal();
   }
 });

  return {
    loadList: loadList,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
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
setTimeout(function(){pokemonRepository.hideLoadingMessage()},700);
