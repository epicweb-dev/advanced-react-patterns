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
        <Toggle.Button />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export default Usage
