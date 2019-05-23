// Compound Components

import React from 'react'
import {Switch} from '../switch'

function Toggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  // 💰 React.Children.map(props.children, child => {/* return child clone here */})
  // 📜 https://reactjs.org/docs/react-api.html#reactchildren
  // 📜 https://reactjs.org/docs/react-api.html#cloneelement
  return <Switch on={on} onClick={toggle} />
}

// 🐨 Flush out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = () => null

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = () => null

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = () => null

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=Advanced%20React%20Patterns&e=Compound%20Components&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export default Usage
