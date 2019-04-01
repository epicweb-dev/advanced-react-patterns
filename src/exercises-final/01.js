// build a basic toggle component

import React from 'react'
import {Switch} from '../switch'

function Toggle({onToggle}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return <Switch on={on} onClick={toggle} />
}

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Build Toggle'

export default Usage
