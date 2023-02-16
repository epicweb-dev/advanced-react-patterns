import * as React from 'react'

function callAll<Args extends Array<unknown>>(
	...fns: Array<((...args: Args) => unknown) | undefined>
) {
	return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

export function useToggle() {
	const [on, setOn] = React.useState(false)
	const toggle = () => setOn(!on)

	function getTogglerProps<Props>({
		onClick,
		...props
	}: {
		onClick?: React.DOMAttributes<HTMLButtonElement>['onClick']
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
		getTogglerProps,
	}
}
