// state reducer
// default reducer

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
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({
  onToggle = noop,
  onReset = noop,
  initialOn = false,
  reducer = toggleReducer,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {on} = state

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
useToggle.reducer = toggleReducer

function Usage() {
  const [timesClicked, setTimesClicked] = React.useState(0)

  function toggleStateReducer(state, action) {
    if (action.type === 'toggle' && timesClicked >= 4) {
      return {on: state.on}
    }
    return useToggle.reducer(state, action)
  }

  const {on, getTogglerProps, reset} = useToggle({
    reducer: toggleStateReducer,
    onToggle: (...args) => {
      setTimesClicked(clicks => clicks + 1)
      console.info('onToggle', ...args)
    },
    onReset: (...args) => {
      setTimesClicked(0)
      console.info('onReset', ...args)
    },
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          on: on,
        })}
      />
      {timesClicked >= 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button onClick={reset}>Reset</button>
    </div>
  )
}
Usage.title = 'State Reducers'

export default Usage
