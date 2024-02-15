import { createContext, use } from 'react'
import { Switch as BaseSwitch } from '#shared/switch'

type Slots = Record<string, Record<string, unknown>>
const SlotContext = createContext<Slots | null>(null)
export function SlotProvider({
	slots,
	children,
}: {
	slots: Slots
	children: React.ReactNode
}) {
	return <SlotContext.Provider value={slots}>{children}</SlotContext.Provider>
}

export function useSlotProps<Props>(
	props: Props & { slot?: string },
	defaultSlot?: string,
): Props {
	const slot = props.slot ?? defaultSlot
	if (!slot) return props

	const slots = use(SlotContext) ?? ({} as Slots)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	return { ...slots[slot], slot, ...props } as Props
}

export function Label(
	props: React.ComponentProps<'label'> & { slot?: string },
) {
	props = useSlotProps(props, 'label')
	return <label {...props} />
}

export function Input(
	props: React.ComponentProps<'input'> & { slot?: string },
) {
	props = useSlotProps(props, 'input')
	return <input {...props} />
}

export function Text(props: React.ComponentProps<'span'> & { slot?: string }) {
	props = useSlotProps(props, 'text')
	return <span {...props} />
}

export function Switch({
	...props
}: Omit<React.ComponentProps<typeof BaseSwitch>, 'on' | 'onClick'> & {
	slot?: string
}) {
	return (
		<BaseSwitch
			{...(useSlotProps(props, 'switch') as React.ComponentProps<
				typeof BaseSwitch
			>)}
		/>
	)
}
