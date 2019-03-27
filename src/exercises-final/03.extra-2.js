// Flexible Compound Components with context
// This allows you to avoid unecessary rerenders

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`,
    )
  }
  return context
}

function Toggle({onToggle, ...rest}) {
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }, [on])
  const value = React.useMemo(() => ({on, toggle}), [on, toggle])
  return <ToggleContext.Provider value={value} {...rest} />
}
Toggle.On = ({children}) => {
  const {on} = useToggle()
  return on ? children : null
}
Toggle.Off = ({children}) => {
  const {on} = useToggle()
  return on ? null : children
}
Toggle.Button = ({...props}) => {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
