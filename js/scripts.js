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

  return {
    add: add,
    getAll: getAll
  };
})();

//to read all the objects of the repository array
//console.log(pokemonRepository.getAll());

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

document.write('<h2>Pokemon Repository thru IIFE</h2>');

//property refers to pokemon object's key and pokemon[property] refers to it's value
pokemonRepository.getAll().forEach(function(pokemon) {
  Object.keys(pokemon).forEach(function(property, index) {
    if (index === 0) {
      document.write(`<strong>${property}: ${pokemon[property]}</strong><br>`);
    } else {
      document.write(`${property}: ${pokemon[property]}<br>`);
    }
  });
  document.write('--------------------------------<br>');
});
