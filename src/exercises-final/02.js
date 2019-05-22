// Primer: Build Toggle

import React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    setOn(!on)
  }

  return <Switch on={on} onClick={toggle} />
}

function Usage() {
  return <Toggle />
}
Usage.title = 'Primer: Build Toggle'

export default Usage
