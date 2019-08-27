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

for (var i = 0; i < repository.length; i++) {
  document.write(repository[i].name + ' \(height: ' + repository[i].height + '\)\n');
  var pokeHeight = repository[i].height;
  var pokeWeight = repository[i].weight;
  if (pokeHeight > 1 && pokeWeight > 10) {
    document.write(' - Wow that\'s really a big one!\n');
  }
}
