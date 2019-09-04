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
    types: ['Fire','Flying'],
    abilities: ['Blaze','Solar-power']
  },
  {
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    types: ['electric'],
    abilities: ['Static','Lightningrod']
  }
];

var tallestPokemon = {
  name: ' ',
  height: 0,
};

var repositoryProperty=Object.keys(repository[0]);
const dash = '--------------------------------';

document.write('<h2>Pokemon Repository</h2>');

repository.forEach(function (pokemon) {
  Object.keys(pokemon).forEach(function(property, index) {
    if (index === 0) {
      document.write(`<strong>${property}: ${pokemon[property]}</strong><br>`);
    } else {
      document.write(`${property}: ${pokemon[property]}<br>`);
    }
  });
  document.write('--------------------------------<br>');
});
