const $ul = document.querySelector('ul');
const $h2 = document.querySelector('h2');

// IIFE - Immeditaly Invoked Function Expression --> (function() {})();
var pokemonRepository = (function () {
  var repository = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function showLoadingMessage() {
    $ul.classList.add('load');
    $h2.innerText = 'Loading Pokemon...';
  }
  /* Add the loaded pokemons to our repository */
  function add(pokemon) {
    repository.push(pokemon);
  }
  /* Load pokemon from the api thru http's fetch method and Promise class */
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(response => response.json()).then((json) => {
      /* console.log(json.results); array of objects for JS generated */
      json.results.forEach((item) => {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  /* To hide the loading message  */
  function hideLoadingMessage() {
    $ul.classList.remove('load');
    $h2.innerText = 'Pokedex';
  }

  /* To close the poped up modal that has pokemon's details */
  function hideModal() {
    if (document.querySelector('#modal-container').classList.contains('is-visible')) {
      const $elementToRemove = document.querySelector('#modal-container');
      /* To remove the #modal-container's element and all its children */
      $elementToRemove.parentElement.removeChild($elementToRemove);
    }
  }
  /* get all the pokemons from our repository */
  function getAll() {
    return repository;
  }

  /* To show detail of the pokemon on the modal */
  function showModal(event, pokemon) {
    const listElement = event.target.parentElement;

    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    modalContainer.classList.add('is-visible');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    const img = document.createElement('img');
    img.src = pokemon.imageUrl;
    img.alt = `${pokemon.name}'s Image`;

    const titleElement = document.createElement('h2');
    titleElement.innerText = `I'm ${pokemon.name} !`;

    const textElement = document.createElement('p');
    textElement.innerText = `My height & weight are ${pokemon.height / 10} m & ${pokemon.weight / 10} kg.`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(img);
    modal.appendChild(titleElement);
    modal.appendChild(textElement);
    modalContainer.appendChild(modal);
    listElement.appendChild(modalContainer);
  }

  /* show details of the specific pokemon that is clicked by the user */
  function showDetails(event, pokemon) {
    const url = pokemon.detailsUrl; // https://pokeapi.co/api/v2/pokemon/1/ --> Sample
    return fetch(url).then(response => response.json()).then((details) => {
      // console.log(details); would print particular pokemon (object)'s detail
      pokemon.imageUrl = details.sprites.front_shiny;
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      /* Function call to display modal */
      showModal(event, pokemon);
      // pokemon.types = Object.keys(details.types);
    }).catch((e) => {
      console.error(e);
    });
  }

  /* DOM - Document Object Model - Add all the pokemons name alone from the
  repository to the html list */
  function addListItem(pokemon) {
    /* To create 'li' element */
    const listItemElement = document.createElement('li');
    /* To create 'button' element */
    const buttonElement = document.createElement('button');
    /* To add innertext to button element */
    buttonElement.innerText = pokemon.name;
    /* To append button element to list */
    listItemElement.appendChild(buttonElement);
    /* To append 'li'st element as a child 'ul' element */
    $ul.appendChild(listItemElement);
    buttonElement.addEventListener('click', (event) => {
      showDetails(event, pokemon);
    });
  }

  /* To close the poped up modal that has pokemon's details thru escape key in the keyboard */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (document.querySelector('#modal-container'))) {
      hideModal();
    }
  });

  /* To close the poped up modal that has pokemon's details clicking on anywhere on the screen */
  document.querySelector('body').addEventListener('click', (e) => {
    if (e.target === document.querySelector('#modal-container')) {
      hideModal();
    }
  });

  return {
    loadList,
    showLoadingMessage,
    hideLoadingMessage,
    add,
    getAll,
    addListItem,
    showDetails,
    showModal,
    hideModal,
  };
}());

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

/* Intentionally delayed in order to show the Loading message */
setTimeout(() => { pokemonRepository.hideLoadingMessage(); }, 700);
