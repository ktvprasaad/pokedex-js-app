//IIFE - Immeditaly Invoked Function Expression --> (function() {})();
var pokemonRepository = (function () {
  var repository = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      types: ['grass','poison'],
      abilities: ['Cholorphyll','Overgrow']
    },
    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      types: ['fire'],
      abilities: ['Blaze','Solar-power']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      weight: 9,
      types: ['water'],
      abilities: ['Rain-dish','Torrent']
    },
    {
      name: 'Spearow',
      height: 0.3,
      weight: 2,
      types: ['flying','normal'],
      abilities: ['Keen-eye','Sniper']
    },
    {
      name: 'Charizard',
      height: 1.7,
      weight: 90.5,
      types: ['fire','flying'],
      abilities: ['Blaze','Solar-power']
    }
  ];

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll(){
    return repository;
  }

  function addListItem(pokemon) {
    /* To create 'li' element */
    var listItemElement = document.createElement('li');
    /* To create 'button' element */
    var buttonElement = document.createElement('button');
    /* To add innertext to button element */
    buttonElement.innerText = pokemon;
    /* To append button element to list */
    listItemElement.appendChild(buttonElement);
    buttonElement.classList.add('newButton');
    var img = document.createElement('img');
    img.src = `img/${pokemon}.png`;
    img.alt = `${pokemon} image`;
    listItemElement.insertBefore(img,buttonElement);
    /* To append 'button' element as a child to the 'li'st element */
    //listItemElement.appendChild(buttonElement);
    /* To append 'li'st element as a child 'ul' element */
    $ul.appendChild(listItemElement);
    // buttonElement.addEventListener('click', function(event){
    //   showDetails(event,pokemon);
    // }); the same action is performed in a separate function as follows
    callListener(buttonElement, pokemon);
  }

  function callListener(button, pokemon) {
    button.addEventListener('click',function(event) {
      showDetails(event, pokemon);
    });
  }

  function showDetails(event, pokemon) {
    /* To add or remove 'button' class */
    event.target.classList.toggle('button');
    /* To add or remove 'newButton' class */
    event.target.classList.toggle('newButton');
    /* var $target = event.target */
    if (event.target.classList.contains('newButton')) {
      event.target.innerText = pokemon;
    } else {
      console.log(pokemon + ' says hi there!');
      event.target.innerText = 'You Got It!';
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    callListener: callListener,
    showDetails: showDetails
  };
})();

//new pokemon declaration
var newPokemon = {
  name: 'Pikachu',
  height: 1.4,
  weight: 6,
  types: ['electric'],
  abilities: ['Static','Lightningrod']
};

//document.write(Object.keys(newPokemon));

//if object, add a new pokemon to the repository thru IIFE pokemonRepository.
//to add a new pokemon object to the repository thru IIFE pokemonRepository.
if (typeof newPokemon === 'object') {
  if (typeof (newPokemon.height) === 'number' && typeof (newPokemon.weight) === 'number') {
    pokemonRepository.add(newPokemon);
  } else {
    alert('Height/Weight is not number!!');
  }
} else {
  alert('Not an object!!');
}

var $ul = document.querySelector('ul');

//property refers to pokemon object's key and pokemon[property] refers to it's value
pokemonRepository.getAll().forEach(function(pokemon) {
  Object.keys(pokemon).forEach(function(property, index) {
    if (index === 0) {
      pokemonRepository.addListItem(pokemon[property]);
    }
  });
});
