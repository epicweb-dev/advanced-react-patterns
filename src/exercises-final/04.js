// custom hooks
import React from 'react'
import {Switch} from '../switch'

function useToggle({onToggle} = {}) {
  const [on, setOn] = React.useState(false)
  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }
  return [on, toggle]
}

function Usage() {
  const [on, toggle] = useToggle({
    onToggle: (...args) => console.log('onToggle', ...args),
  })
  return <Switch on={on} onClick={toggle} />
}
Usage.title = 'Custom hooks'

export default Usage
