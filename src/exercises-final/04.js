// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

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
  function toggle() {
    dispatch({type: 'toggle'})
  }

  return (
    <ToggleContext.Provider value={{...state, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  return React.useContext(ToggleContext)
}

Toggle.On = function On({children}) {
  const {on} = useToggle()
  return on ? children : null
}

Toggle.Off = function Off({children}) {
  const {on} = useToggle()
  return on ? null : children
}

Toggle.Button = function Button({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function Usage() {
  return (
    <div>
      <Toggle>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <div>
          <Toggle.Button />
        </div>
      </Toggle>
    </div>
  )
}
Usage.title = 'Flexible Compound Components'

export default Usage
