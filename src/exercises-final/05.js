// prop collections
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
  return {
    on,
    toggle,
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle,
    },
  }
}

function Usage() {
  const {on, togglerProps} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
  })
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}
Usage.title = 'Prop Collections'

export default Usage
