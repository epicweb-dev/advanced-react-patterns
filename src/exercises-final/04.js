// custom hooks
import React from 'react'
import {Switch} from '../switch'

const noop = () => {}
function useToggle({onToggle = noop} = {}) {
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
    onToggle: (...args) => console.info('onToggle', ...args),
  })
  return <Switch on={on} onClick={toggle} />
}
Usage.title = 'Custom hooks'

export default Usage
