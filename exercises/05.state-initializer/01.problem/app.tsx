import { Switch } from '~/shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	// 🐨 pass an object with the initialOn property set to true
	// 💰 {initialOn: true}
	const { on, getTogglerProps, getResetterProps } = useToggle()

	return (
		<div>
			<Switch {...getTogglerProps({ on: on })} />
			<button {...getResetterProps({})}>Reset</button>
		</div>
	)
}
