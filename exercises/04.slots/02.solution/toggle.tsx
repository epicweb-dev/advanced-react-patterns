import { createContext, use, useId, useState } from 'react'
import { Switch } from '#shared/switch.tsx'
import { SlotProvider } from './slots'

type ToggleValue = { on: boolean; toggle: () => void; id: string }
const ToggleContext = createContext<ToggleValue | undefined>(undefined)
ToggleContext.displayName = 'ToggleContext'

export function Toggle({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)
	const generatedId = useId()
	id = id ?? generatedId

	const labelProps = { htmlFor: id }

	return (
		<SlotProvider slots={{ label: labelProps }}>
			<ToggleContext.Provider value={{ on, toggle, id }}>
				{children}
			</ToggleContext.Provider>
		</SlotProvider>
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
}: Omit<React.ComponentProps<typeof Switch>, 'on' | 'onClick'>) {
	const { on, toggle, id } = useToggle()
	return <Switch {...props} id={id} on={on} onClick={toggle} />
}
