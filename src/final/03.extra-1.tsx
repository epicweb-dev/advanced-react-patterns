// Compound Components
// 💯 custom hook validation
// http://localhost:3000/isolated/final/03.extra-1.tsx

import * as React from 'react'
import {Switch} from '../switch'

type ToggleValue = {on: boolean; toggle: () => void}
const ToggleContext = React.createContext<ToggleValue | undefined>(undefined)
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}: {children: React.ReactNode}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

function ToggleOn({children}: {children: React.ReactNode}) {
  const {on} = useToggle()
  return <>{on ? children : null}</>
}

function ToggleOff({children}: {children: React.ReactNode}) {
  const {on} = useToggle()
  return <>{on ? null : children}</>
}

function ToggleButton({
  ...props
}: Omit<React.ComponentProps<typeof Switch>, 'on' | 'onClick'>) {
  const {on, toggle} = useToggle()
  return <Switch {...props} on={on} onClick={toggle} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App
