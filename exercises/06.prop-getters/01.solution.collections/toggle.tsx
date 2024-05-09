import { useState } from 'react'

export function useToggle() {
	const [on, setOn] = useState(false)
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
