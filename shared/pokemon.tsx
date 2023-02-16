import type {PokemonData} from './types'

function PokemonDataView({pokemon}: {pokemon: PokemonData}) {
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <section>
        <h2>
          {pokemon.name}
          <sup>{pokemon.number}</sup>
        </h2>
      </section>
      <section>
        <ul>
          {pokemon.attacks.special.map(attack => (
            <li key={attack.name}>
              <label>{attack.name}</label>:{' '}
              <span>
                {attack.damage < 0 ? 'XX' : attack.damage}{' '}
                <small>({attack.type})</small>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const allPokemon: Record<string, Omit<PokemonData, 'fetchedAt'>> = {
  pikachu: {
    id: 'UG9rZW1vbjowMjU=',
    number: '025',
    name: 'Pikachu',
    image: '/img/pokemon/pikachu.jpg',
    color: '#EDD37E',
    attacks: {
      special: [
        {
          name: 'Discharge',
          type: 'Electric',
          damage: 35,
        },
        {
          name: 'Thunder',
          type: 'Electric',
          damage: 100,
        },
        {
          name: 'Thunderbolt',
          type: 'Electric',
          damage: 55,
        },
      ],
    },
  },
  mew: {
    id: 'UG9rZW1vbjoxNTE=',
    number: '151',
    image: '/img/pokemon/mew.jpg',
    name: 'Mew',
    color: '#ECC4D0',
    attacks: {
      special: [
        {
          name: 'Dragon Pulse',
          type: 'Dragon',
          damage: 65,
        },
        {
          name: 'Earthquake',
          type: 'Ground',
          damage: 100,
        },
        {
          name: 'Fire Blast',
          type: 'Fire',
          damage: 100,
        },
        {
          name: 'Hurricane',
          type: 'Flying',
          damage: 80,
        },
        {
          name: 'Hyper Beam',
          type: 'Normal',
          damage: 120,
        },
        {
          name: 'Moonblast',
          type: 'Fairy',
          damage: 85,
        },
        {
          name: 'Psychic',
          type: 'Psychic',
          damage: 55,
        },
        {
          name: 'Solar Beam',
          type: 'Grass',
          damage: 120,
        },
        {
          name: 'Thunder',
          type: 'Electric',
          damage: 100,
        },
      ],
    },
  },
  mewtwo: {
    id: 'UG9rZW1vbjoxNTA=',
    number: '150',
    image: '/img/pokemon/mewtwo.jpg',
    name: 'Mewtwo',
    color: '#BAABBA',
    attacks: {
      special: [
        {
          name: 'Hyper Beam',
          type: 'Normal',
          damage: 120,
        },
        {
          name: 'Psychic',
          type: 'Psychic',
          damage: 55,
        },
        {
          name: 'Shadow Ball',
          type: 'Ghost',
          damage: 45,
        },
      ],
    },
  },
  ditto: {
    id: 'UG9rZW1vbjoxMzI=',
    number: '132',
    image: '/img/pokemon/ditto.jpg',
    name: 'Ditto',
    color: '#BDAED1',
    attacks: {
      special: [
        {
          name: 'Struggle',
          type: 'Normal',
          damage: 15,
        },
      ],
    },
  },
  charizard: {
    id: 'UG9rZW1vbjowMDY=',
    number: '006',
    image: '/img/pokemon/charizard.jpg',
    name: 'Charizard',
    color: '#EAC492',
    attacks: {
      special: [
        {
          name: 'Dragon Claw',
          type: 'Dragon',
          damage: 35,
        },
        {
          name: 'Fire Blast',
          type: 'Fire',
          damage: 100,
        },
        {
          name: 'Flamethrower',
          type: 'Fire',
          damage: 55,
        },
      ],
    },
  },
  bulbasaur: {
    id: 'UG9rZW1vbjowMDE=',
    number: '001',
    image: '/img/pokemon/bulbasaur.jpg',
    name: 'Bulbasaur',
    color: '#7DAD96',
    attacks: {
      special: [
        {
          name: 'Power Whip',
          type: 'Grass',
          damage: 70,
        },
        {
          name: 'Seed Bomb',
          type: 'Grass',
          damage: 40,
        },
        {
          name: 'Sludge Bomb',
          type: 'Poison',
          damage: 55,
        },
      ],
    },
  },
}

export {PokemonDataView, allPokemon}
