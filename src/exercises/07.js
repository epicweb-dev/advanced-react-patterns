// prop getters

import React from 'react'
import {Switch} from '../switch'

// Uh oh! Someone wants to use our togglerProps object, but they need to apply
// their own `onClick` handler.

// 💰 You're gonna need this (I'll explain what it does later):
// const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
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

  function getTogglerProps() {
    // 🐨 this function should return an object with the same properties as the
    // togglerProps object, except it should also accept a "props" object and
    // merge the two together.
    // 🦉 The trick here is you need to merge the onClick you're passed with
    // the one we need applied.
    // 💰 onClick: callAll(props.onClick, toggle)
  }

  return {
    on,
    toggle,
    // 🐨 you can get rid of togglerProps. We'll just use the prop getter.
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle,
    },
    getTogglerProps,
  }
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const {on, getTogglerProps} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
  })
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
Usage.title = 'Prop Getters'

export default Usage
