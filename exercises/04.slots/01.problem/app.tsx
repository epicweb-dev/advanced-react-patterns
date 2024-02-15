import { useId } from 'react'
import { Input, Label } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from './toggle.tsx'

export function App() {
	const partyModeId = useId()
	return (
		<div>
			<div>
				<Toggle>
					<label htmlFor={partyModeId}>Party mode</label>
					<ToggleButton id={partyModeId} />
					<ToggleOn>Let's party 🥳</ToggleOn>
					<ToggleOff>Sad town 😭</ToggleOff>
				</Toggle>
			</div>
			<hr />
			<div>
				<TextField>
					<Label>Venue</Label>
					<Input />
				</TextField>
			</div>
		</div>
	)
}
