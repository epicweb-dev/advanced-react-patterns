import { Toggle, ToggleOn, ToggleOff, ToggleButton } from './toggle'

export function App() {
	return (
		<div>
			<Toggle>
				<ToggleOn>The button is on</ToggleOn>
				<ToggleOff>The button is off</ToggleOff>
				<div>
					<ToggleButton />
				</div>
			</Toggle>
		</div>
	)
}
