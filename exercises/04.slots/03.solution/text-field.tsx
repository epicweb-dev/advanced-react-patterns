import { useId } from 'react'
import { SlotProvider } from './slots'

export function TextField({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const generatedId = useId()
	id = id ?? generatedId

	const labelProps = { htmlFor: id }
	const inputProps = { id }

	return (
		<SlotProvider slots={{ label: labelProps, input: inputProps }}>
			{children}
		</SlotProvider>
	)
}
