import { Input, Label, Switch, Text } from './slots.tsx'
import { TextField } from './text-field.tsx'
import { Toggle } from './toggle.tsx'

export function App() {
	return (
		<div>
			<div>
				<Toggle>
					<Label>Party mode</Label>
					<Switch />
					<Text slot="onText">Let's party 🥳</Text>
					<Text slot="offText">Sad town 😭</Text>
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
