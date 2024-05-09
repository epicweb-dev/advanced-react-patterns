import { useState } from 'react'
import { toggleReducer, useToggle } from './toggle.tsx'
import { Switch } from '#shared/switch.tsx'

export function App() {
	const [timesClicked, setTimesClicked] = useState(0)
	const clickedTooMuch = timesClicked >= 4

	const { on, getTogglerProps, getResetterProps } = useToggle({
		reducer(state, action) {
			if (action.type === 'toggle' && clickedTooMuch) {
				return state
			}
			return toggleReducer(state, action)
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
