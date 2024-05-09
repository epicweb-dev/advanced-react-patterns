import { useState } from 'react'
import { useToggle } from './toggle.tsx'
import { Switch } from '#shared/switch.tsx'
// 🐨 import the toggleReducer

export function App() {
	const [timesClicked, setTimesClicked] = useState(0)
	const clickedTooMuch = timesClicked >= 4

	const { on, getTogglerProps, getResetterProps } = useToggle({
		reducer(state, action) {
			// 🐨 add an if statement for our special logic
			// 💰 if the action.type === 'toggle' and clickedTooMuch is true
			// then return state

			// 🐨 otherwise call the toggleReducer with the state and action
			// and return that.

			// 💣 delete this whole switch statement
			switch (action.type) {
				case 'toggle': {
					if (clickedTooMuch) {
						return state
					}
					return { on: !state.on }
				}
				case 'reset': {
					return { on: false }
				}
			}
		},
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
