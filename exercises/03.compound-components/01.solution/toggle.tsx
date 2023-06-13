import * as React from 'react'
import { Switch } from '~/shared/switch.tsx'

type ToggleValue = { on: boolean; toggle: () => void }
const ToggleContext = React.createContext<ToggleValue | undefined>(undefined)
ToggleContext.displayName = 'ToggleContext'

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = React.useState(false)
	const toggle = () => setOn(!on)

	return (
		<ToggleContext.Provider value={{ on, toggle }}>
			{children}
		</ToggleContext.Provider>
	)
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	const { on } = React.useContext(ToggleContext)!
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	const { on } = React.useContext(ToggleContext)!
	return <>{on ? null : children}</>
}

export function ToggleButton({
	...props
}: Omit<React.ComponentProps<typeof Switch>, 'on' | 'onClick'>) {
	const { on, toggle } = React.useContext(ToggleContext)!
	return <Switch {...props} on={on} onClick={toggle} />
}
