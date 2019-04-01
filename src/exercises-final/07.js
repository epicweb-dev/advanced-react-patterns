// State Initializers

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function useToggle({
  onToggle = noop,
  onReset = noop,
  initialOn = false,
} = {}) {
  const [on, setOn] = React.useState(initialOn)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  function reset() {
    setOn(initialOn)
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
