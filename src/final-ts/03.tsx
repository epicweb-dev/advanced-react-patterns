// Flexible Compound Components with context
// http://localhost:3000/isolated/final-ts/03.tsx

import * as React from 'react'
import {Switch} from '../switch'
interface ToggleContextType {
  readonly on: boolean
  readonly toggle: () => void
}
const ToggleContext = React.createContext<ToggleContextType>(undefined!)
ToggleContext.displayName = 'ToggleContext'

const Toggle: React.FC = props => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const value: ToggleContextType = {on, toggle} as const
  return <ToggleContext.Provider value={value} {...props} />
}

function useToggle(): ToggleContextType {
  return React.useContext(ToggleContext)
}

const ToggleOn: React.FC = ({children}) => {
  const {on} = useToggle()
  return on ? <>{children}</> : null
}

const ToggleOff: React.FC = ({children}) => {
  const {on} = useToggle()
  return on ? null : <>{children}</>
}

const ToggleButton: React.FC<
  Partial<React.ComponentProps<typeof Switch>>
> = props => {
  const {on, toggle} = useToggle()
  return <Switch {...props} on={on} onClick={toggle}  />
}

function App(): JSX.Element {
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
