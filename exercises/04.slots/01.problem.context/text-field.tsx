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

	// 🐨 use these for the slot you render
	// const labelProps = { htmlFor: id }
	// const inputProps = { id }

	// 🐨 wrap this in a SlotContext.Provider with the value set to an object
	// that has a label and input property with the values of labelProps and
	// inputProps respectively.
	return children
}
