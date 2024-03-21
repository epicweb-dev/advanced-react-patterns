import { useReducer } from 'react'

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

export function useToggle({ initialOn = false } = {}) {
	// 🐨 wrap this in a useRef
	const initialState = { on: initialOn }
	// 🐨 pass the ref-ed initial state into useReducer
	const [state, dispatch] = useReducer(toggleReducer, initialState)
	const { on } = state

	const toggle = () => dispatch({ type: 'toggle' })
	// 🐨 make sure the ref-ed initial state gets passed here
	const reset = () => dispatch({ type: 'reset', initialState })

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
		toggle,
		reset,
		getTogglerProps,
	}
}
