// 🦺 create a Slots type that's just an object of objects
// 🐨 create and export a SlotContext with that type and default it to an empty object

// 🐨 create a useSlotProps hook which:
// 1. accepts props (any type) and slot (string)
// 2. gets the slots from the SlotContext
// 3. gets the props from the slot by its name
// 4. returns the merged props with the slot and given props

export function Label(props: React.ComponentProps<'label'>) {
	// 🐨 get the props from useSlotProps for a slot called "label" and apply those to the label
	return <label {...props} />
}

export function Input(props: React.ComponentProps<'input'>) {
	// 🐨 get the props from useSlotProps for a slot called "label" and apply those to the input
	return <input {...props} />
}
