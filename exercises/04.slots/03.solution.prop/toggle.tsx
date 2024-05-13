import { useId, useState } from 'react'
import { SlotContext } from './slots'

export function Toggle({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const [on, setOn] = useState(false)
	const generatedId = useId()
	id ??= generatedId

	const toggle = () => setOn(!on)

	const labelProps = { htmlFor: id }
	const onTextProps = { hidden: on ? undefined : true }
	const offTextProps = { hidden: on ? true : undefined }
	const switchProps = { id, on, onClick: toggle }

	return (
		<SlotContext
			value={{
				label: labelProps,
				onText: onTextProps,
				offText: offTextProps,
				switch: switchProps,
			}}
		>
			{children}
		</SlotContext>
	)
}
