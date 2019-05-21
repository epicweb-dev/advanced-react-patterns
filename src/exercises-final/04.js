// Custom hooks

import React from 'react'
import {Switch} from '../switch'

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

function useToggle() {
  const [state, dispatch] = React.useReducer(toggleReducer, {on: false})
  const {on} = state

  function toggle() {
    dispatch({type: 'TOGGLE'})
  }

  return [on, toggle]
}

function Toggle() {
  const [on, toggle] = useToggle()
  return <Switch on={on} onClick={toggle} />
}

function Usage() {
  return <Toggle />
}
Usage.title = 'Custom hooks'

export default Usage
