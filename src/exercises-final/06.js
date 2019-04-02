// prop getters

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useToggle({onToggle = noop} = {}) {
  const [{on}, dispatch] = React.useReducer(toggleReducer, {on: false})

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

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
