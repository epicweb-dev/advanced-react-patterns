import { createContext, use, useState } from 'react'
import { Switch } from '#shared/switch.tsx'

type ToggleValue = { on: boolean; toggle: () => void }
const ToggleContext = createContext<ToggleValue | null>(null)

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	return (
		<ToggleContext.Provider value={{ on, toggle }}>
			{children}
		</ToggleContext.Provider>
	)
}

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
	const { on, toggle } = useToggle()
	return <Switch {...props} on={on} onClick={toggle} />
}
