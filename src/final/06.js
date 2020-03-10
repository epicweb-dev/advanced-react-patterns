// control props

import React from 'react'
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

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange = noop,
  on: controlledOn,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const onIsControlled = controlledOn !== undefined
  const on = onIsControlled ? controlledOn : state.on

  function dispatchWithOnChange(action) {
    if (onIsControlled) {
      onChange(reducer({...state, on}, action), action)
    } else {
      dispatch(action)
    }
  }

  const toggle = () => dispatchWithOnChange({type: useToggle.types.toggle})
  const reset = () =>
    dispatchWithOnChange({type: useToggle.types.reset, initialState})

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  function getResetterProps({onClick, ...props} = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}
useToggle.reducer = toggleReducer
useToggle.types = {
  toggle: 'toggle',
  reset: 'reset',
}

function Toggle({on: controlledOn, onChange}) {
  const {on, getTogglerProps} = useToggle({on: controlledOn, onChange})
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function Usage() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === useToggle.types.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick() {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}

export default Usage
// we're adding the Toggle export for tests
export {Toggle}
