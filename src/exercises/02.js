// Primer: Build Toggle

import React from 'react'
// 🐨 uncomment this import to get the switch component.
// It takes an `onClick` and an `on` prop
// import {Switch} from '../switch'

function Toggle({onToggle}) {
  // 🐨 this toggle component is going to need to have state for `on`

  // 🐨 make a `toggle` function here which will:
  // 1. toggle the `on` state
  // 2. call `onToggle` with the new `on` state.
  // 💰 `const newOn = !on`

  // 🐨 render the Switch here and pass `on` and `onClick`
  return 'todo'
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
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Primer: Build Toggle'

export default Usage
