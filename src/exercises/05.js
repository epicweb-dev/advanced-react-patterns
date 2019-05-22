// Prop Collections and Getters

import React from 'react'
import {Switch} from '../switch'

// In typical UI components, you need to take accessibility into account. For
// a button functioning as a toggle, it should have the `aria-pressed` attribute
// set to `true` or `false` if it's toggled on or off.
// In addition to remembering that, people need to remember to also add the
// `onClick` handler.
//
// In our simple example, this isn't too much for folks to remember, but in more
// complex components, the list of props that need to be applied to elements
// can be extensive, so it can be a good idea to take the common use cases for
// our hook and/or components and make objects of props that people can simply
// spread across the UI they render.

const noop = () => {}

function toggleReducer(state, {type}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({onToggle = noop} = {}) {
  const [state, dispatch] = React.useReducer(toggleReducer, {on: false})
  const {on} = state

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  // 🐨 instead of returning an array here, let's return an object that has
  // the following properties: `on`, `toggle`, and `togglerProps`.
  // 🐨 togglerProps should be an object that has `aria-pressed` and `onClick` properties:
  // 💰 {'aria-pressed': on, onClick: toggle}
  return [on, toggle]
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const {on, togglerProps} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
  })
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
Usage.title = 'Prop Collections and Getters'

export default Usage
