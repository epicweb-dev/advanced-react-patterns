// State Initializers

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    case 'reset': {
      return initialState
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useToggle({onToggle = noop, onReset = noop, initialOn = false} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [{on}, dispatch] = React.useReducer(toggleReducer, initialState)

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  function reset() {
    dispatch({type: 'reset', initialState})
    onReset(initialOn)
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
    reset,
    toggle,
    getTogglerProps,
  }
}

function Usage() {
  const {on, getTogglerProps, reset} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
    onReset: (...args) => console.info('onReset', ...args),
    initialOn: false,
  })
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button onClick={reset}>Reset</button>
    </div>
  )
}
Usage.title = 'State Initializers'

export default Usage
