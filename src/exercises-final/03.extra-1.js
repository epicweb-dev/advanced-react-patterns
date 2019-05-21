// Flexible Compound Components with context
// 💯 Avoid unnecessary re-renders

import React from 'react'
import {Switch} from '../switch'

const ToggleStateContext = React.createContext()
const ToggleDispatchContext = React.createContext()

function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      return {on: !state.on}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function Toggle({children}) {
  const [state, dispatch] = React.useReducer(toggleReducer, {on: false})

  return (
    <ToggleStateContext.Provider value={state}>
      <ToggleDispatchContext.Provider value={dispatch}>
        {children}
      </ToggleDispatchContext.Provider>
    </ToggleStateContext.Provider>
  )
}

function useToggleState() {
  return React.useContext(ToggleStateContext)
}

function useToggleDispatch() {
  return React.useContext(ToggleDispatchContext)
}

Toggle.On = function On({children}) {
  const {on} = useToggleState()
  return on ? children : null
}

Toggle.Off = function Off({children}) {
  const {on} = useToggleState()
  return on ? null : children
}

Toggle.Button = function Button({...props}) {
  const {on} = useToggleState()
  const dispatch = useToggleDispatch()
  return (
    <Switch on={on} onClick={() => dispatch({type: 'TOGGLE'})} {...props} />
  )
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
