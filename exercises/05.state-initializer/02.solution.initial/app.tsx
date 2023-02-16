import { Switch } from '~/shared/switch'
import { useToggle } from './toggle'

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
