// control props
// 💯 generic controlled reducer

import React from 'react'
import _ from 'lodash'
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
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useControlledReducer(reducer, initialState, lazyInitializer, options) {
  if (typeof lazyInitializer === 'object') {
    options = lazyInitializer
    lazyInitializer = undefined
  }
  const controlledState = _.omitBy(options.controlledState, _.isUndefined)
  const [internalState, dispatch] = React.useReducer(
    (state, action) => {
      const changes = reducer({...state, ...controlledState}, action)
      const controlledChanges = {...changes, ...controlledState}
      return _.isEqual(state, controlledChanges) ? state : controlledChanges
    },
    initialState,
    lazyInitializer,
  )
  return [
    {...internalState, ...controlledState},
    action => {
      dispatch(action)
      options.onChange(
        reducer({...internalState, ...controlledState}, action),
        action,
      )
    },
  ]
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  onChange = noop,
  state: controlledState = {},
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = useControlledReducer(reducer, initialState, {
    controlledState,
    onChange,
  })
  const {on} = state

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const reset = () => dispatch({type: useToggle.types.reset, initialState})

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

function Toggle({on: controlledOn, onChange}) {
  const {on, getTogglerProps} = useToggle({state: {on: controlledOn}, onChange})
  const props = getTogglerProps({on})
  return <Switch {...props} />
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
      {timesClicked >= 4 ? (
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
export {Toggle}
