import { Switch } from '~/shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	const { on, getTogglerProps, getResetterProps } = useToggle({
		initialOn: true,
	})

	return (
		<div>
			<Switch {...getTogglerProps({ on: on })} />
			<button {...getResetterProps({})}>Reset</button>
		</div>
	)
}
