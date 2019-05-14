// build a basic toggle component

import React from 'react'
import {Switch} from '../switch'
// import mockApi from '../mockApi';

const noop = () => {}

function useToggle({onToggle = noop}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return [on, toggle]
}

function Toggle({onToggle}) {
  const [on, toggle] = useToggle({onToggle})
  return <Switch on={on} onClick={toggle} />
}

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Set initial state after fetching API data'

export default Usage
