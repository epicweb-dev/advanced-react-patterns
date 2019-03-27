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

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
