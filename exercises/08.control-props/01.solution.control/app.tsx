import { useState } from 'react'
import { Toggle, type ToggleAction, type ToggleState } from './toggle.tsx'

export function App() {
	const [bothOn, setBothOn] = useState(false)
	const [timesClicked, setTimesClicked] = useState(0)

	function handleToggleChange(state: ToggleState, action: ToggleAction) {
		if (action.type === 'toggle' && timesClicked > 4) {
			return
		}
		setBothOn(state.on)
		setTimesClicked(c => c + 1)
	}

	function handleResetClick() {
		setBothOn(false)
		setTimesClicked(0)
	}

	return (
		<div>
			<div>
				<Toggle on={bothOn} onChange={handleToggleChange} />
				<Toggle on={bothOn} onChange={handleToggleChange} />
			</div>
			{timesClicked > 4 ? (
				<div data-testid="notice">
					Whoa, you clicked too much!
					<br />
				</div>
			) : (
				<div data-testid="click-count">Click count: {timesClicked}</div>
			)}
			<button onClick={handleResetClick}>Reset</button>
			<hr />
			<div>
				<div>Uncontrolled Toggle:</div>
				<Toggle
					onChange={(...args) =>
						console.info('Uncontrolled Toggle onChange', ...args)
					}
				/>
			</div>
		</div>
	)
}
