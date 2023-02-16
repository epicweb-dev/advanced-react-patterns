import * as React from 'react'
import { Switch } from '~/shared/switch'
import { useToggle } from './toggle'

export function App() {
	const [timesClicked, setTimesClicked] = React.useState(0)
	const clickedTooMuch = timesClicked >= 4

	// 🐨 create a toggleStateReducer function here that accepts the state and action
	// It should do almost the same thing the regular reducer does above except
	// in the 'toggle' action type, it should check whether the toggle has been
	// clicked too much and if it has then it should just return the state rather
	// than make a new state object.

	const { on, getTogglerProps, getResetterProps } = useToggle({
		// 🐨 Pass your toggleStateReducer as the `reducer` option
		// 💰 reducer: toggleStateReducer,
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
