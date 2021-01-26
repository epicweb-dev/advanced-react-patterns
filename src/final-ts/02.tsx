// Compound Components
// http://localhost:3000/isolated/final-ts/02.tsx

import * as React from 'react'
import {Switch} from '../switch'

const Toggle: React.FC = ({children}) => {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  return (
    <>
      {React.Children.map(children, child =>
        React.cloneElement(
          //@ts-expect-errors
          child,
          {on, toggle},
        ),
      )}
    </>
  )
}

const ToggleOn: React.FC<{on?: boolean}> = ({on, children}) => {
  return on ? <>{children}</> : null
}

const ToggleOff: React.FC<{on?: boolean}> = ({on, children}) => {
  return on ? null : <>{children}</>
}

type ToggleButtonProps = Partial<React.ComponentProps<typeof Switch>> &
  Partial<{
    on: boolean
    toggle: React.ComponentProps<typeof Switch>['onClick']
  }>
const ToggleButton: React.VFC<ToggleButtonProps> = ({
  on = false,
  toggle = () => void 0,
  ...props
}) => {
  return <Switch on={on} onClick={toggle} {...props} />
}

function App(): JSX.Element {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App
