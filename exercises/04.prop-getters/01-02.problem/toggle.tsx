import * as React from 'react'

export function useToggle() {
	const [on, setOn] = React.useState(false)
	const toggle = () => setOn(!on)

	// 🐨 Add a property called `togglerProps`. It should be an object that has
	// `aria-pressed` and `onClick` properties.
	return { on, toggle, togglerProps: {} }
}
