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
    case useToggle.types.toggleOn: {
      return {on: true}
    }
    case useToggle.types.toggleOff: {
      return {on: false}
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useControlledReducer(
  reducer,
  initialState,
  {externalState, onChange},
) {
  const [internalState, dispatch] = React.useReducer(reducer, initialState)
  if (externalState) {
    return [
      externalState,
      action => onChange(reducer(externalState, action), action),
    ]
  }
  return [internalState, dispatch]
}

function useToggle({
  onToggle = noop,
  onReset = noop,
  initialOn = false,
  reducer = toggleReducer,
  onChange,
  state: externalState,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [{on}, dispatch] = useControlledReducer(reducer, initialState, {
    externalState,
    onChange,
  })

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

function Toggle({on: externalOn, onChange}) {
  let state
  if (externalOn !== undefined) {
    state = {on: externalOn}
  }
  const {on, getTogglerProps} = useToggle({state, onChange})
  const props = getTogglerProps({on})
  return (
    <div>
      <Switch {...props} />
    </div>
  )
}

function Usage() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === useToggle.types.toggle && timesClicked >= 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick(params) {
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
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button onClick={handleResetClick}>Reset</button>
    </div>
  )
}
Usage.title = 'Control Props'

export default Usage
export {Toggle}
