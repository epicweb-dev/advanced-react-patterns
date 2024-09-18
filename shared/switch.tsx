// STOP! You should not have to change anything in this file to
// make it through the workshop. If tests are failing because of
// this switch not having properties set correctly, then the
// problem is probably in your implementation. Tip: Check
// your `render` method or the `getTogglerProps` method
// (if we've gotten to that part)

export function Switch({
	on,
	className = '',
	'aria-label': ariaLabel,
	onClick,
	...props
}: { on: boolean } & React.ComponentProps<'button'>) {
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
			// if it has an id then it's probably going to be labeled, otherwise we'll use a generic label
			// note, this is mostly for testing purposes
			aria-label={ariaLabel ?? ('id' in props ? undefined : 'Toggle')}
			aria-checked={on}
			onClick={onClick}
			className={btnClassName}
			{...props}
		/>
	)
}
