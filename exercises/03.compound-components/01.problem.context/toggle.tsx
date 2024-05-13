import { useState } from 'react'
import { Switch } from '#shared/switch.tsx'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext
// 💰 the default value should be `null`
// 🦺 the typing for the context value should be `{on: boolean; toggle: () => void}`
// but because we must initialize it to `null`, you need to union that with `null`

export function Toggle({ children }: { children: React.ReactNode }) {
	const [on, setOn] = useState(false)
	const toggle = () => setOn(!on)

	// 💣 remove this and instead return <ToggleContext> where
	// the value is an object that has `on` and `toggle` on it. Render children
	// within the provider.
	return <>TODO...</>
}

export function ToggleOn({ children }: { children: React.ReactNode }) {
	// 🐨 instead of this constant value, we'll need to get that from
	// use(ToggleContext)
	// 📜 https://react.dev/reference/react/use#reading-context-with-use
	const on = false
	return <>{on ? children : null}</>
}

export function ToggleOff({ children }: { children: React.ReactNode }) {
	// 🐨 do the same thing to this that you did to the ToggleOn component
	const on = false
	return <>{on ? null : children}</>
}

type ToggleButtonProps = Omit<React.ComponentProps<typeof Switch>, 'on'> & {
	on?: boolean
}
export function ToggleButton(props: ToggleButtonProps) {
	// 🐨 get `on` and `toggle` from the ToggleContext with `use`
	const on = false
	const toggle = () => {}
	return <Switch on={on} onClick={toggle} {...props} />
}

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/
