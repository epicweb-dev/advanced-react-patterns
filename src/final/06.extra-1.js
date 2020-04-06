// control props
// 💯 generic controlled reducer
// http://localhost:3000/isolated/final/06.extra-1.js

import React from 'react'
import _ from 'lodash'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))
const noop = () => {}

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

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case actionTypes.toggle: {
      return {on: !state.on}
    }
    case actionTypes.reset: {
      return initialState
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
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

  const toggle = () => dispatch({type: actionTypes.toggle})
  const reset = () => dispatch({type: actionTypes.reset, initialState})

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

function Toggle({on: controlledOn, onChange}) {
  const {on, getTogglerProps} = useToggle({state: {on: controlledOn}, onChange})
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function App() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked >= 4) {
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

export default App
export {Toggle}
