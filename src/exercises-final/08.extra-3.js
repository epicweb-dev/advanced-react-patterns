// state reducer

import React from 'react'
import warning from 'fbjs/lib/warning'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case useToggle.types.toggle: {
      return {on: !state.on}
    }
    case useToggle.types.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useReducerWithValidation(reducer, initialState, initializer = v => v) {
  const initialStateKeys = React.useState(
    () => Object.keys(initializer(initialState)),
    [],
  )[0]

  function validationReducer(state, action) {
    const newState = reducer(state, action)
    const extraKeys = Object.keys(newState).filter(
      key => !initialStateKeys.includes(key),
    )
    warning(
      !extraKeys.length,
      `Warning! The following keys were unexpectedly added to the reducer's state: ${extraKeys.join(
        ', ',
      )}`,
    )
    return newState
  }
  return React.useReducer(
    process.env.NODE_ENV === 'production' ? reducer : validationReducer,
    initialState,
    initializer,
  )
}

function useToggle({
  onToggle = noop,
  onReset = noop,
  initialOn = false,
  reducer = toggleReducer,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = useReducerWithValidation(reducer, initialState)
  const {on} = state

  function toggle() {
    const newOn = !on
    dispatch({type: useToggle.types.toggle})
    onToggle(newOn)
  }

  function reset() {
    dispatch({type: useToggle.types.reset, initialState})
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
useToggle.types = {
  toggle: 'toggle',
  reset: 'reset',
}

function Usage() {
  const [timesClicked, setTimesClicked] = React.useState(0)

  function toggleStateReducer(state, action) {
    if (action.type === useToggle.types.toggle && timesClicked >= 4) {
      return {on: state.on, foo: 'bar'}
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
Usage.title = 'State Reducers with types'

export default Usage
