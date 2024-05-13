import { useId } from 'react'

export function TextField({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const generatedId = useId()
	id ??= generatedId

	// 🐨 create a slots object that has props for both label and input slots
	// 💰 the label should provide an htmlFor prop and the input should provide an id

	// 🐨 wrap this in a SlotContext with the value set to the slots object
	return children
}
