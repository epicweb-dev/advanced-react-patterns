import { useReducer } from 'react'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

type ToggleState = { on: boolean }
type ToggleAction = { type: 'toggle' }
// 🦺 add an action type for reset:
// 💰 | { type: 'reset'; initialState: ToggleState }

function toggleReducer(state: ToggleState, action: ToggleAction) {
	switch (action.type) {
		case 'toggle': {
			return { on: !state.on }
		}
		// 🐨 add a case for 'reset' that simply returns the "initialState"
		// which you can get from the action.
	}
}

// 🐨 We'll need to add an option for `initialOn` here (default to false)
export function useToggle() {
	// 🐨 update the initialState object to use the initialOn option
	const initialState = { on: false }
	const [state, dispatch] = useReducer(toggleReducer, initialState)
	const { on } = state

	const toggle = () => dispatch({ type: 'toggle' })

	// 🐨 add a reset function here which dispatches a 'reset' type with your
	// initialState object and calls `onReset` with the initialState.on value

	function getTogglerProps<Props>({
		onClick,
		...props
	}: {
		onClick?: React.ComponentProps<'button'>['onClick']
	} & Props) {
		return {
			'aria-checked': on,
			onClick: callAll(onClick, toggle),
			...props,
		}
	}

	return {
		on,
		// 🐨 add your reset function here.
		toggle,
		getTogglerProps,
	}
}
