import { Switch } from '#shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	const { on, getTogglerProps, reset } = useToggle({ initialOn: true })
	return (
		<div>
			<Switch {...getTogglerProps({ on })} />
			<hr />
			<button onClick={reset}>Reset</button>
		</div>
	)
}
