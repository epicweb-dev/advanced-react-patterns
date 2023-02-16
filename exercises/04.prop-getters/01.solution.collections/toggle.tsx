import * as React from 'react'

export function useToggle() {
	const [on, setOn] = React.useState(false)
	const toggle = () => setOn(!on)

	return {
		on,
		toggle,
		togglerProps: {
			'aria-checked': on,
			onClick: toggle,
		},
	}
}
