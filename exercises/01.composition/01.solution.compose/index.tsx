import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { SportDataView, allSports } from '#shared/sports.tsx'
import { type SportData, type User } from '#shared/types.tsx'

function App() {
	const [user] = useState<User>({ name: 'Kody', image: '/img/kody.png' })
	const [sportList] = useState<Array<SportData>>(() => Object.values(allSports))
	const [selectedSport, setSelectedSport] = useState<SportData | null>(null)

	return (
		<div
			id="app-root"
			style={{ ['--accent-color' as any]: selectedSport?.color ?? 'black' }}
		>
			<Nav avatar={<img src={user.image} alt={`${user.name} profile`} />} />
			<div className="spacer" data-size="lg" />
			<Main
				sidebar={
					<List
						listItems={sportList.map(p => (
							<li key={p.id}>
								<SportListItemButton
									sport={p}
									onClick={() => setSelectedSport(p)}
								/>
							</li>
						))}
					/>
				}
				content={<Details selectedSport={selectedSport} />}
			/>
			<div className="spacer" data-size="lg" />
			<Footer
				footerMessage={`Don't have a good day–have a great day, ${user.name}`}
			/>
		</div>
	)
}

function Nav({ avatar }: { avatar: React.ReactNode }) {
	return (
		<nav>
			<ul>
				<li>
					<a href="#/home">Home</a>
				</li>
				<li>
					<a href="#/about">About</a>
				</li>
				<li>
					<a href="#/contact">Contact</a>
				</li>
			</ul>
			<a href="#/me" title="User Settings">
				{avatar}
			</a>
		</nav>
	)
}

function Main({
	sidebar,
	content,
}: {
	sidebar: React.ReactNode
	content: React.ReactNode
}) {
	return (
		<main>
			{sidebar}
			{content}
		</main>
	)
}

function List({ listItems }: { listItems: Array<React.ReactNode> }) {
	return (
		<div className="sport-list">
			<ul>{listItems}</ul>
		</div>
	)
}

function SportListItemButton({
	sport,
	onClick,
}: {
	sport: SportData
	onClick: () => void
}) {
	return (
		<button
			className="sport-item"
			onClick={onClick}
			style={{ ['--accent-color' as any]: sport.color }}
			aria-label={sport.name}
		>
			<img src={sport.image} alt={sport.name} />
			<div className="sport-list-info">
				<strong>{sport.name}</strong>
			</div>
		</button>
	)
}

function Details({ selectedSport }: { selectedSport: SportData | null }) {
	return (
		<div className="sport-details">
			{selectedSport ? (
				<SportDataView sport={selectedSport} />
			) : (
				<div>Select a Sport</div>
			)}
		</div>
	)
}

function Footer({ footerMessage }: { footerMessage: string }) {
	return (
		<footer>
			<p>{footerMessage}</p>
		</footer>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
