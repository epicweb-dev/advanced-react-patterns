import { createContext, use } from 'react'
import { Switch as BaseSwitch } from '#shared/switch'

type Slots = Record<string, Record<string, unknown>>
export const SlotContext = createContext<Slots>({})

function useSlotProps<Props>(
	props: Props, // 🐨 this should now be Props & { slot?: string }
	slot: string, // 🐨 rename this to "defaultSlot" and make it optional
): Props {
	// 🐨 create a slot variable that is set to props.slot and falls back to the defaultSlot
	// 🐨 if there's no slot, return the props as they are

	const slots = use(SlotContext)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	return { ...slots[slot], slot, ...props } as Props
}

// 🐨 add an optional slot to the props type here
export function Label(props: React.ComponentProps<'label'>) {
	props = useSlotProps(props, 'label')
	return <label {...props} />
}

// 🐨 add an optional slot to the props type here
export function Input(props: React.ComponentProps<'input'>) {
	props = useSlotProps(props, 'input')
	return <input {...props} />
}

// 🐨 add an optional slot to the props type here
export function Text(props: React.ComponentProps<'span'>) {
	props = useSlotProps(props, 'text')
	return <span {...props} />
}

// 🐨 add an optional slot to the props type here
export function Switch(
	props: Omit<React.ComponentProps<typeof BaseSwitch>, 'on'>,
) {
	return (
		<BaseSwitch
			{...(useSlotProps(props, 'switch') as React.ComponentProps<
				typeof BaseSwitch
			>)}
		/>
	)
}
