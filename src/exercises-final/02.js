// Compound Components

import React from 'react'
import {Switch} from '../switch'

function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)
  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }
  return React.Children.map(children, child =>
    React.cloneElement(child, {on, toggle}),
  )
}
Toggle.On = ({on, children}) => (on ? children : null)
Toggle.Off = ({on, children}) => (on ? null : children)
Toggle.Button = ({on, toggle, ...props}) => (
  <Switch on={on} onClick={toggle} {...props} />
)

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <div>
      <Toggle onToggle={onToggle}>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <Toggle.Button />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
