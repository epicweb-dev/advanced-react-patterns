// Compound Components

import React from 'react'
import {Switch} from '../switch'

function isCompoundComponent(child) {
  for (const property in Toggle) {
    if (Toggle.hasOwnProperty(property)) {
      if (child.type === Toggle[property]) {
        return true
      }
    }
  }
  return false
}

function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return React.Children.map(children, child => {
    return isCompoundComponent(child)
      ? React.cloneElement(child, {on, toggle})
      : child
  })
}

Toggle.On = function On({on, children}) {
  return on ? children : null
}

Toggle.Off = function Off({on, children}) {
  return on ? null : children
}

Toggle.Button = function Button({on, toggle, ...props}) {
  return <Switch on={on} onClick={toggle} {...props} />
}

function Usage() {
  return (
    <div>
      <Toggle onToggle={(...args) => console.info('onToggle', ...args)}>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <span>Hello</span>
        <Toggle.Button />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export default Usage
