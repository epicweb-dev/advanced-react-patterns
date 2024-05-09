import { useToggle } from './toggle.tsx'
import { Switch } from '#shared/switch.tsx'

export function App() {
	// 💣 delete this:
	const getTogglerProps = (props: any) => props
	// 🐨 destructure the getTogglerProps function from useToggle
	const { on } = useToggle()
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
