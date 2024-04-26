import { useToggle } from './toggle.tsx'
import { Switch } from '#shared/switch.tsx'

export function App() {
	const { on, togglerProps } = useToggle()
	return (
		<div>
			<Switch on={on} {...togglerProps} />
			<hr />
			<button aria-label="custom-button" {...togglerProps}>
				{on ? 'on' : 'off'}
			</button>
		</div>
	)
}
