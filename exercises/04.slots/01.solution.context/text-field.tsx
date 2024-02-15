import { useId } from 'react'
import { SlotContext } from './slots'

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
		<SlotContext.Provider value={{ label: labelProps, input: inputProps }}>
			{children}
		</SlotContext.Provider>
	)
}
