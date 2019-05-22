// prop collections

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

function useToggle() {
  const [state, dispatch] = React.useReducer(toggleReducer, {on: false})
  const {on} = state

  function toggle() {
    dispatch({type: 'toggle'})
  }

  return {
    on,
    toggle,
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle,
    },
  }
}

function Usage() {
  const {on, togglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
Usage.title = 'Prop Collections'

export default Usage
