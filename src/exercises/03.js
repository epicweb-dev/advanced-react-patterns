// Flexible Compound Components

import React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

function Toggle({onToggle, children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return React.Children.map(children, child => {
    return typeof child === 'string'
      ? child
      : React.cloneElement(child, {on, toggle})
  })
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitely from
// ToggleContext now
// 💰 `const context = useContext(ToggleContext)`
// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({on, children}) {
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the On component
function ToggleOff({on, children}) {
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton({on, toggle, ...props}) {
  return <Switch on={on} onClick={toggle} {...props} />
}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=Advanced%20React%20Patterns&e=Flexible%20Compound%20Components&em=
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
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}
Usage.title = 'Flexible Compound Components'

export default Usage
