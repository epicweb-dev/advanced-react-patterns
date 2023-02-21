import * as React from 'react'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

type ToggleState = { on: boolean }
type ToggleAction =
	| { type: 'toggle' }
	| { type: 'reset'; initialState: ToggleState }

function toggleReducer(state: ToggleState, action: ToggleAction) {
	switch (action.type) {
		case 'toggle': {
			return { on: !state.on }
		}
		case 'reset': {
			return action.initialState
		}
	}
}

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
export function useToggle({ initialOn = false } = {}) {
	const { current: initialState } = React.useRef<ToggleState>({ on: initialOn })
	// 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
	// provided as an option
	// ... and that's it! Don't forget to check the next step!
	const [state, dispatch] = React.useReducer(toggleReducer, initialState)
	const { on } = state

	const toggle = () => dispatch({ type: 'toggle' })
	const reset = () => dispatch({ type: 'reset', initialState })

	function getTogglerProps<Props>({
		onClick,
		...props
	}: { onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'] } & Props) {
		return {
			'aria-checked': on,
			onClick: callAll(onClick, toggle),
			...props,
		}
	}

	function getResetterProps<Props>({
		onClick,
		...props
	}: { onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'] } & Props) {
		return {
			onClick: callAll(onClick, reset),
			...props,
		}
	}

	return {
		on,
		reset,
		toggle,
		getTogglerProps,
		getResetterProps,
	}
}
