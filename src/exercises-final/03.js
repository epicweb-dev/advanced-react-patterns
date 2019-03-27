// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
function useToggle() {
  return React.useContext(ToggleContext)
}

function Toggle({onToggle, ...rest}) {
  const [on, setOn] = React.useState(false)
  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }
  return (
    <ToggleContext.Provider
      value={{on: on, toggle: toggle}}
      {...rest}
    />
  )
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
