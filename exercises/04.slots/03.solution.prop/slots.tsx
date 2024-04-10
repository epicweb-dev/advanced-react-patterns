import { createContext, use } from 'react'
import { Switch as BaseSwitch } from '#shared/switch'

export type SlotType =
	| 'label'
	| 'input'
	| 'switch'
	| 'text'
	| 'onText'
	| 'offText'
type Slots = Record<string, Record<string, unknown>>
export const SlotContext = createContext<Slots>({})

function useSlotProps<Props>(
	props: Props & { slot?: SlotType },
	defaultSlot?: SlotType,
): Props & { slot?: SlotType } {
	const slot = props.slot ?? defaultSlot
	if (!slot) return props

	const slots = use(SlotContext)

	// a more proper "mergeProps" function is in order here
	// to handle things like merging event handlers better.
	// we'll get to that a bit in a later exercise.
	return { ...slots[slot], slot, ...props } as Props & { slot?: SlotType }
}

export function Label(
	props: React.ComponentProps<'label'> & { slot?: SlotType },
) {
	props = useSlotProps(props, 'label')
	return <label {...props} />
}

export function Input(
	props: React.ComponentProps<'input'> & { slot?: SlotType },
) {
	props = useSlotProps(props, 'input')
	return <input {...props} />
}

export function Text(
	props: React.ComponentProps<'span'> & { slot?: SlotType },
) {
	props = useSlotProps(props, 'text')
	return <span {...props} />
}

type SwitchProps = Omit<React.ComponentProps<typeof BaseSwitch>, 'on'> & {
	slot?: SlotType
}
export function Switch(props: SwitchProps) {
	return (
		<BaseSwitch
			{...(useSlotProps(props, 'switch') as React.ComponentProps<
				typeof BaseSwitch
			>)}
		/>
	)
}
