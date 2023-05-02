import * as React from 'react'

// STOP! You should not have to change anything in this file to
// make it through the workshop. If tests are failing because of
// this switch not having properties set correctly, then the
// problem is probably in your implementation. Tip: Check
// your `render` method or the `getTogglerProps` method
// (if we've gotten to that part)

// this is only a class component so we can do some implementation-detail
// tests to make sure you're doing things as instructed :)
export function Switch({
	on,
	className = '',
	'aria-label': ariaLabel,
	onClick,
	...props
}: { on: boolean } & Omit<JSX.IntrinsicElements['button'], 'ref'>) {
	const btnClassName = [
		className,
		'toggle-btn',
		on ? 'toggle-btn-on' : 'toggle-btn-off',
	]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			role="switch"
			aria-label={ariaLabel ?? 'Toggle'}
			aria-checked={on}
			onClick={onClick}
			className={btnClassName}
			{...props}
		/>
	)
}
