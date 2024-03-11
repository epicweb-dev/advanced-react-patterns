import { createContext, use, useId, useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { SlotContext } from './slots'

// 🐨 delete all this context stuff
type ToggleValue = { on: boolean; toggle: () => void; id: string }
const ToggleContext = createContext<ToggleValue | null>(null)

export function Toggle({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const [on, setOn] = useState(false)
	const generatedId = useId()
	id = id ?? generatedId

	const toggle = () => setOn(!on)

	const labelProps = { htmlFor: id }
	// 🐨 add props objects for onText, offText, and switch

	return (
		<SlotContext.Provider
			value={{
				label: labelProps,
				// 🐨 add slots for onText, offText, and switch
			}}
		>
			{/* 🐨 get rid of the ToggleContext here */}
			<ToggleContext.Provider value={{ on, toggle, id }}>
				{children}
			</ToggleContext.Provider>
		</SlotContext.Provider>
	)
}

// 🐨 delete everything below here!
function useToggle() {
	const context = use(ToggleContext)
	if (!context) {
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

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton({ ...props }: ToggleButtonProps) {
	const { on, toggle, id } = useToggle()
	return <Switch {...props} id={id} on={on} onClick={toggle} />
}
