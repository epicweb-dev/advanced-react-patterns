import * as React from 'react'
import { Switch } from '~/shared/switch.tsx'

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
	// 🐨 add a the `on` and `onChange` options here.
	// 💰 you can alias it to `controlledOn` as we do in the Toggle component
	// below to avoid "variable shadowing."
	initialOn = false,
	reducer = toggleReducer,
}: {
	// 🦺 add types for onChange and on here
	initialOn?: boolean
	reducer?: typeof toggleReducer
} = {}) {
	const { current: initialState } = React.useRef<ToggleState>({ on: initialOn })
	const [state, dispatch] = React.useReducer(reducer, initialState)
	// 🐨 determine whether on is controlled and assign that to `onIsControlled`
	// 💰 `controlledOn != null` // <-- note, using "!=" here instead of "!==" to count both `null` and `undefined` as uncontrolled.

	// 🐨 Replace the next line with `const on = ...` which should be `controlledOn` if
	// `onIsControlled`, otherwise, it should be `state.on`.
	const { on } = state

	// We want to call `onChange` any time we need to make a state change, but we
	// only want to call `dispatch` if `!onIsControlled` (otherwise we could get
	// unnecessary renders).
	// 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
	// right here. This will:
	// 1. accept an action
	// 2. if onIsControlled is false, call dispatch with that action
	// 3. Then call `onChange` with our "suggested changes" and the action.

	// 🦉 "Suggested changes" refers to: the changes we would make if we were
	// managing the state ourselves. This is similar to how a controlled <input />
	// `onChange` callback works. When your handler is called, you get an event
	// which has information about the value input that _would_ be set to if that
	// state were managed internally.
	// So how do we determine our suggested changes? What code do we have to
	// calculate the changes based on the `action` we have here? That's right!
	// The reducer! So if we pass it the current state and the action, then it
	// should return these "suggested changes!"
	//
	// 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do for that onChange call:
	// `onChange(reducer({...state, on}, action), action)`
	// 💰 Also note that user's don't *have* to pass an `onChange` prop (it's not required)
	// so keep that in mind when you call it! How could you avoid calling it if it's not passed?

	// make these call `dispatchWithOnChange` instead
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

export function Toggle({
	// 🦉 note that we're accepting a prop called "on" but we alias it to
	// controlledOn so it doesn't clash from the internally managed "on" variable
	// we get out of useToggle.
	on: controlledOn,
	onChange,
}: {
	on?: boolean
	onChange?: (state: ToggleState, action: ToggleAction) => void
}) {
	const { on, getTogglerProps } = useToggle({
		// 🐨 forward on and onChange
		// on: controlledOn,
		// onChange
	})
	const props = getTogglerProps({ on })
	return <Switch {...props} />
}
