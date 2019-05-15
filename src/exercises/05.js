// build a basic toggle component

import React from 'react'
import {Switch} from '../switch'

// 🐨 Uncomment this.
// mockApi is a promise that resolves after 1 second
// import mockApi from '../mockApi';

const noop = () => {}

function useToggle({onToggle = noop}) {
  const [on, setOn] = React.useState(false)

  // 🐨 Add your useEffect here, and set the initial state of the toggler
  // 📜 Read https://reactjs.org/docs/hooks-reference.html#useeffect

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }

  return [on, toggle]
}

function Toggle({onToggle}) {
  const [on, toggle] = useToggle({onToggle})
  return <Switch on={on} onClick={toggle} />
}

// 💯 Add a loading indicator when the API is running
// Pass it to the Toggle component, and only render the it when it's done loading

// 💯 Add true when calling the mockApi: `mockApi(true)`. The API will now fail.
// Add an error indicator to the Toggle component when the API fails

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Set initial state after fetching API data'

export default Usage
