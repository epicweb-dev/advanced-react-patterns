// custom hooks
import React from 'react'
import {Switch} from '../switch'

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

  return [on, toggle]
}

function Usage() {
  const [on, toggle] = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
  })
  return <Switch on={on} onClick={toggle} />
}
Usage.title = 'Custom hooks'

export default Usage
