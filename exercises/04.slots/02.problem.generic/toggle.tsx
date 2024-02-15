import { createContext, use, useState } from 'react'
import { Switch } from '#shared/switch.tsx'

// 🐨 add an id string to the ToggleValue type
type ToggleValue = { on: boolean; toggle: () => void }
const ToggleContext = createContext<ToggleValue | undefined>(undefined)
ToggleContext.displayName = 'ToggleContext'

// 🐨 update this to accept an optional id
export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	// 🐨 generate an id using useId (💰 similar to in text-field.tsx)

	const toggle = () => setOn(!on)

	// 🐨 create labelProps that sets htmlFor to the id

	// 🐨 wrap this in SlotContext.Provider and pass the labelProps in the label slot
	// 🐨 add the id to the value in the ToggleContext.Provider
	return (
		<ToggleContext.Provider value={{ on, toggle }}>
			{children}
		</ToggleContext.Provider>
	)
}

function useToggle() {
	const context = use(ToggleContext)
	if (context === undefined) {
		throw new Error(
			'Cannot find ToggleContext. All Toggle components must be rendered within <Toggle />',
		)
	}
	return context
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	const { on } = useToggle()
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	const { on } = useToggle()
	return <>{on ? null : children}</>
}

export function ToggleButton({
	...props
}: Omit<React.ComponentProps<typeof Switch>, 'on'>) {
	// 🐨 get the id out of useToggle
	const { on, toggle } = useToggle()
	// 🐨 pass the id for the ToggleButton here
	return <Switch {...props} on={on} onClick={toggle} />
}
