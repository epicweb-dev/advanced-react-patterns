import { useState } from 'react'
import { useToggle } from './toggle.tsx'
import { Switch } from '#shared/switch.tsx'

export function App() {
	const [initialOn, setInitialOn] = useState(true)
	const { on, getTogglerProps, reset } = useToggle({ initialOn })
	return (
		<div>
			<button onClick={() => setInitialOn(o => !o)}>
				initialOn is: {initialOn ? 'true' : 'false'}
			</button>
			<Switch {...getTogglerProps({ on })} />
			<hr />
			<button onClick={reset}>Reset</button>
		</div>
	)
}
