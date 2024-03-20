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
	id ??= generatedId

	const slots = {
		label: { htmlFor: id },
		input: { id },
	}

	return <SlotContext.Provider value={slots}>{children}</SlotContext.Provider>
}
