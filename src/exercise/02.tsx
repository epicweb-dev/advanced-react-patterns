// Composition and Layout Components
// http://localhost:3000/isolated/exercise/02.tsx

import '../02.styles.css'
import * as React from 'react'
import {allPokemon, PokemonDataView} from '../pokemon'
import type {PokemonData, User} from '../types'

function App() {
  const [user] = React.useState<User>({name: 'Kody', image: '/img/kody.png'})
  const [pokemonList] = React.useState<Array<PokemonData>>(() =>
    Object.values(allPokemon),
  )
  const [selectedPokemon, setSelectedPokemon] =
    React.useState<PokemonData | null>(null)

  return (
    <div
      id="app-root"
      style={{['--accent-color' as any]: selectedPokemon?.color ?? 'black'}}
    >
      {/*
        🐨 make Nav accept a ReactElement prop called "avatar"
        instead of a User prop called "user"
      */}
      <Nav avatar={<img src={user.image} alt={`${user.name} profile`} />} />
      <div className="spacer" data-size="lg" />
      {/* 
        🐨 make Main accept ReactElement props called "sidebar" and "content"
        instead of the props it accepts right now.
      */}
      <Main
        pokemonList={pokemonList}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <div className="spacer" data-size="lg" />
      {/*
        🐨 make Footer accept a String prop called "footerMessage"
        instead of the User prop called "user"
      */}
      <Footer user={user} />
    </div>
  )
}

function Nav({avatar}: {avatar: React.ReactElement}) {
  return (
    <nav>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <a href="/me" title="User Settings">
        {avatar}
      </a>
    </nav>
  )
}

function Main({
  // 🐨 all these props should be removed in favor of the sidebar and content props
  pokemonList,
  selectedPokemon,
  setSelectedPokemon,
}: {
  pokemonList: Array<PokemonData>
  selectedPokemon: PokemonData | null
  setSelectedPokemon: (pokemon: PokemonData) => void
}) {
  return (
    <main>
      {/* 🐨 put the sidebar and content props here */}
      <List pokemonList={pokemonList} setSelectedPokemon={setSelectedPokemon} />
      <Details selectedPokemon={selectedPokemon} />
    </main>
  )
}

function List({
  // 🐨 make this accept an array of ReactElements called "listItems"
  // and remove the existing props
  pokemonList,
  setSelectedPokemon,
}: {
  pokemonList: Array<PokemonData>
  setSelectedPokemon: (pokemon: PokemonData) => void
}) {
  return (
    <div className="pokemon-list">
      <ul>
        {/* 🐨 render the listItems here */}
        {pokemonList.map(p => (
          <li key={p.id}>
            <PokemonListItemButton
              pokemon={p}
              onClick={() => setSelectedPokemon(p)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function PokemonListItemButton({
  pokemon,
  onClick,
}: {
  pokemon: PokemonData
  onClick: () => void
}) {
  return (
    <button
      className="pokemon-item"
      onClick={onClick}
      style={{['--accent-color' as any]: pokemon.color}}
      aria-label={pokemon.name}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="pokemon-list-info">
        <strong>{pokemon.name}</strong>
        <small>{`(${pokemon.number})`}</small>
      </div>
    </button>
  )
}

function Details({selectedPokemon}: {selectedPokemon: PokemonData | null}) {
  return (
    <div className="pokemon-details">
      {selectedPokemon ? (
        <PokemonDataView pokemon={selectedPokemon} />
      ) : (
        <div>Select a Pokemon</div>
      )}
    </div>
  )
}

// 🐨 make this accept a footerMessage string instead of the user
function Footer({user}: {user: User}) {
  return (
    <footer>
      <p>{`Don't have a good day–have a great day, ${user.name}`}</p>
    </footer>
  )
}

export default App
