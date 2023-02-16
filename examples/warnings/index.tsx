// http://localhost:3000/app/examples.warnings

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

function App() {
	const [name, setName] = React.useState<string | undefined>()
	const [animal, setAnimal] = React.useState<string | undefined>('tiger')
	return (
		<div>
			<div>
				<label>
					Read only (missing onChange): <input value="yo" />
				</label>
			</div>
			<div>
				<button onClick={() => setName('bob')}>Set name to bob</button>
				<label>
					Changing from uncontrolled to controlled:{' '}
					<input value={name} onChange={e => setName(e.target.value)} />
				</label>
			</div>
			<div>
				<button onClick={() => setAnimal(undefined)}>Unset animal</button>
				<label>
					Changing from controlled to uncontrolled:{' '}
					<input value={animal} onChange={e => setAnimal(e.target.value)} />
				</label>
			</div>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
