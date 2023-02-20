import * as React from 'react'

export function useToggle() {
	const [on, setOn] = React.useState(false)
	const toggle = () => setOn(!on)

	// 🐨 create a function called getTogglerProps that accepts an object
	// of props and returns an object of props that includes 'aria-clicked' and onClick.

	// 💰 Make sure to handle the case where the user provides their own
	// 'aria-checked' and 'onClick' props (as well as if they don't or if they
	// provide more props).

	return {
		on,
		toggle,
		// 🐨 swap togglerProps with getTogglerProps
		togglerProps: {
			'aria-checked': on,
			onClick: toggle,
		},
	}
}
