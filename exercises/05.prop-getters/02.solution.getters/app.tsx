import { Switch } from '#shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	const { on, getTogglerProps } = useToggle()
	return (
		<div>
			<Switch {...getTogglerProps({ on })} />
			<hr />
			<button
				{...getTogglerProps({
					'aria-label': 'custom-button',
					onClick: () => console.info('onButtonClick'),
					id: 'custom-button-id',
				})}
			>
				{on ? 'on' : 'off'}
			</button>
		</div>
	)
}
