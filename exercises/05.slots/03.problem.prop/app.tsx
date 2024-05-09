import { Input, Label } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle, ToggleButton, ToggleOff, ToggleOn } from './toggle.tsx'

export function App() {
	return (
		<div>
			<div>
				<Toggle>
					<Label>Party mode</Label>
					{/* 🐨 switch this for the Switch slot component */}
					<ToggleButton />
					{/* 🐨 change these to the Text slot component with appropriate slot props */}
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
