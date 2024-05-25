import { Switch } from '#shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	// 🐨 add an initialOn option (set it to true) and get the reset callback from useToggle
	const { on, getTogglerProps } = useToggle()
	// 💣 delete this reset callback in favor of what you get from useToggle
	const reset = () => {}
	return (
		<div>
			<Switch {...getTogglerProps({ on })} />
			<hr />
			<button onClick={reset}>Reset</button>
		</div>
	)
}
