// Compound Components

import React from 'react'
import {Switch} from '../switch'

// Since we're no longer responsible for rendering the switch ourselves,
// we'll need to accept a `children` prop and render that instead.
// 🐨 add `children` to the props destructuring here
function Toggle({onToggle}) {
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  // 🐨 replace this with a call to React.Children.map and map each child to
  // a clone of that child with the props they need using React.cloneElement
  // 💰 React.Children.map(children, child => {/* return child clone here */})
  // 📜 https://reactjs.org/docs/react-api.html#reactchildren
  // 📜 https://reactjs.org/docs/react-api.html#cloneelement
  return <Switch on={on} onClick={toggle} />
}

// 🐨 add a property on Toggle for On, Off, and Button:

// Accepts `on` and `children` props and returns `children` if `on` is true
Toggle.On = () => null

// Accepts `on` and `children` props and returns `children` if `on` is false
Toggle.Off = () => null

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
Toggle.Button = () => null

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=advanced%20react%20patterns&e=02%20Compound%20Components&em=
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
      <Toggle onToggle={(...args) => console.info('onToggle', ...args)}>
        <Toggle.On>The button is on</Toggle.On>
        <Toggle.Off>The button is off</Toggle.Off>
        <Toggle.Button />
      </Toggle>
    </div>
  )
}
Usage.title = 'Compound Components'

export default Usage
