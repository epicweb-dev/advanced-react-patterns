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

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=advanced%20react%20patterns&e=01%20Build%20Toggle&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Toggle />
}
Usage.title = 'Primer: Build Toggle'

export default Usage
