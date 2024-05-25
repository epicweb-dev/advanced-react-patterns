import { useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { useToggle } from './toggle.tsx'

export function App() {
	const [timesClicked, setTimesClicked] = useState(0)
	const clickedTooMuch = timesClicked >= 4

	const { on, getTogglerProps, getResetterProps } = useToggle({
		// 🐨 create a reducer function here that accepts the state and action
		// It should do almost the same thing the regular reducer does in
		// ./toggle.tsx except in the action.type === 'toggle' case, it should check
		// whether the toggle has been clicked too much and if it has then it should
		// just return the state rather than make a new state object.
	})

	return (
		<div>
			<Switch
				{...getTogglerProps({
					on: on,
					onClick: () => setTimesClicked(count => count + 1),
				})}
			/>
			{clickedTooMuch ? (
				<div data-testid="notice">
					Whoa, you clicked too much!
					<br />
				</div>
			) : timesClicked > 0 ? (
				<div data-testid="click-count">Click count: {timesClicked}</div>
			) : null}
			<button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
				Reset
			</button>
		</div>
	)
}
