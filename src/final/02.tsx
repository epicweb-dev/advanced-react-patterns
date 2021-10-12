// Composition and Layout Components
// http://localhost:3000/isolated/final/02.tsx

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
      <Nav avatar={<img src={user.image} alt={`${user.name} profile`} />} />
      <div className="spacer" data-size="lg" />
      <Main
        sidebar={
          <List
            listItems={pokemonList.map(p => (
              <li key={p.id}>
                <PokemonListItemButton
                  pokemon={p}
                  onClick={() => setSelectedPokemon(p)}
                />
              </li>
            ))}
          />
        }
        content={<Details selectedPokemon={selectedPokemon} />}
      />
      <div className="spacer" data-size="lg" />
      <Footer
        footerMessage={`Don't have a good day–have a great day, ${user.name}`}
      />
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
  sidebar,
  content,
}: {
  sidebar: React.ReactElement
  content: React.ReactElement
}) {
  return (
    <main>
      {sidebar}
      {content}
    </main>
  )
}

function List({listItems}: {listItems: Array<React.ReactElement>}) {
  return (
    <div className="pokemon-list">
      <ul>{listItems}</ul>
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

function Footer({footerMessage}: {footerMessage: string}) {
  return (
    <footer>
      <p>{footerMessage}</p>
    </footer>
  )
}

export default App
