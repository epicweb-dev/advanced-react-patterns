import { useState } from 'react'

export function useToggle() {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	// 🐨 Add a property called `togglerProps`. It should be an object that has
	// `aria-checked` and `onClick` properties.
	return { on, toggle, togglerProps: {} }
}
