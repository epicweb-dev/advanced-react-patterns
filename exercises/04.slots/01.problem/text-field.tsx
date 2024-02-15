import { useId } from 'react'

export function TextField({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const generatedId = useId()
	id = id ?? generatedId

	// const labelProps = { htmlFor: id }
	// const inputProps = { id }

	return children
}
