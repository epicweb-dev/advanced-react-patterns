import { Switch } from '~/shared/switch'
import { useToggle } from './toggle'

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
