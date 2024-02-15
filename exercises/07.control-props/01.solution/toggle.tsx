import { useReducer, useRef } from 'react'
import { Switch } from '#shared/switch.tsx'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

export type ToggleState = { on: boolean }
export type ToggleAction =
	| { type: 'toggle' }
	| { type: 'reset'; initialState: ToggleState }

export function toggleReducer(state: ToggleState, action: ToggleAction) {
	switch (action.type) {
		case 'toggle': {
			return { on: !state.on }
		}
		case 'reset': {
			return action.initialState
		}
	}
}

export function useToggle({
	initialOn = false,
	reducer = toggleReducer,
	onChange,
	on: controlledOn,
}: {
	initialOn?: boolean
	reducer?: typeof toggleReducer
	onChange?: (state: ToggleState, action: ToggleAction) => void
	on?: boolean
} = {}) {
	const { current: initialState } = useRef<ToggleState>({ on: initialOn })
	const [state, dispatch] = useReducer(reducer, initialState)
	const onIsControlled = controlledOn != null
	const on = onIsControlled ? controlledOn : state.on

	function dispatchWithOnChange(action: ToggleAction) {
		if (!onIsControlled) {
			dispatch(action)
		}
		onChange?.(reducer({ ...state, on }, action), action)
	}

	const toggle = () => dispatchWithOnChange({ type: 'toggle' })
	const reset = () => dispatchWithOnChange({ type: 'reset', initialState })

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

export function Toggle({
	on: controlledOn,
	onChange,
}: {
	on?: boolean
	onChange?: (state: ToggleState, action: ToggleAction) => void
}) {
	const { on, getTogglerProps } = useToggle({ on: controlledOn, onChange })
	const props = getTogglerProps({ on })
	return <Switch {...props} />
}
