import { createContext, use, useState } from 'react'
import { Switch } from '#shared/switch.tsx'

type ToggleValue = { on: boolean; toggle: () => void }
const ToggleContext = createContext<ToggleValue | null>(null)

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	return <ToggleContext value={{ on, toggle }}>{children}</ToggleContext>
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	const { on } = use(ToggleContext)!
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	const { on } = use(ToggleContext)!
	return <>{on ? null : children}</>
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton({ ...props }: ToggleButtonProps) {
	const { on, toggle } = use(ToggleContext)!
	return <Switch {...props} on={on} onClick={toggle} />
}
