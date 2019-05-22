// Compound Components

import React from 'react'
import {Switch} from '../switch'

function toggleReducer(state, action) {
  switch (action.type) {
    case 'toggle': {
      return {on: !state.on}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function Toggle({children}) {
  const [state, dispatch] = React.useReducer(toggleReducer, {on: false})
  const {on} = state

  function toggle() {
    dispatch({type: 'toggle'})
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
      <Toggle>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <Toggle.Button />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export default Usage
