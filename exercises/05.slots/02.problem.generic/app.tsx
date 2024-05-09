import { useId } from 'react'
import { Input, Label } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from './toggle.tsx'

export function App() {
	// 💣 delete this variable
	const partyModeId = useId()
	return (
		<div>
			<div>
				<Toggle>
					{/* 🐨 switch this label for the Label component from ./slots.tsx */}
					<label htmlFor={partyModeId}>Party mode</label>
					{/* 🐨 remove this id prop */}
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
