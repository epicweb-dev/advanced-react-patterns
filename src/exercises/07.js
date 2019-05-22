// Control Props

import React from 'react'
import {Switch} from '../switch'

// Sometimes, people want to be able to manage the internal state of our
// component from the outside. The state reducer allows them to manage what
// state changes are made when a state change happens, but sometimes people
// may want to make state changes themselves. We can allow them to do this with
// a feature called "Control Props"

// In this example, we've created a <Toggle /> component which can accept a prop
// called `on` and another called `onChange`. These works similar to the `value`
// and `onChange` props of <input />. Your job is to make those props actually
// control the state of `on` and call the `onChange` with the suggested chagnes.

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case useToggle.types.toggle: {
      return {on: !state.on}
    }
    case useToggle.types.reset: {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({
  // instead of an individual on* change handler for ever element of state
  // of our component, we'll have a more generic `onChange` option which will
  // be called any time any of our elements of state changes.
  // 🐨 remove `onToggle` and `onReset` and replace them with an `onChange`
  // 💰 you can default onChange to noop as well
  onToggle = noop,
  onReset = noop,
  initialOn = false,
  reducer = toggleReducer,
  // 🐨 add an `on` option here
  // 💰 you can alias it to `controlledOn` to avoid "variable shadowing."
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  // 🐨 determined whether on is controlled and assign that to `onIsControlled`
  // 💰 `controlledOn !== undefined`

  // 🐨 Replace the next line with assigning `on` to `controlledOn` if
  // `onIsControlled`, otherwise, it should be `state.on`.
  const {on} = state

  // We want to call `onChange` any time we need to make a state change, but we
  // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
  // unnecessary renders).
  // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
  // right here. This will:
  // 1. accept an action
  // 2. call dispatch with that action, but only if `!onIsControlled`
  // 3. call `onChange` with our "suggested changes" and the action.

  // 🦉 "Suggested changes" refers to: the changes we would make if we were
  // managing the state ourselves. This is similar to how a controlled <input />
  // `onChange` callback works. When your handler is called, you get an event
  // which has information about the value input that _would_ be set to if that
  // state were managed internally.
  // So how do we determine our suggested changes? What code do we have to
  // calculate the changes based on the `action` we have here? That's right!
  // The reducer! So if we pass it the current state and the action, then it
  // should return these "suggested changes!"
  //
  // 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do:
  // `onChange(reducer({...state, on}, action), action)`

  function toggle() {
    // 🐨 instead of all this, we can now just call our `dispatchWithOnChange`
    const newOn = !on
    dispatch({type: useToggle.types.toggle})
    onToggle(newOn)
  }

  function reset() {
    // 🐨 instead of all this, we can now just call our `dispatchWithOnChange`
    dispatch({type: useToggle.types.reset, initialState})
    onReset(initialOn)
  }

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
  }
}
useToggle.reducer = toggleReducer
useToggle.types = {
  toggle: 'toggle',
  reset: 'reset',
}

// 💯 This is fairly easy when you only have one element of state in your
// component (the `on` state in our case), but in a more complex component,
// you may have several elements of state you want the developer to be able to
// control. Once you have two, things get complicated quickly, and three or more
// is basically a nightmare.
// See if you can make a more generic abstraction to handle any number of
// elements of state in your component. Start by changing the Toggle component
// to call `useToggle` like this:
// `const {on, getTogglerProps} = useToggle({state: {on: controlledOn}, onChange})`
// Then make that work. To test it out, you could try adding another element
// of state to your toggle reducer.
//
// 💰 Hey, I get it, this one's really hard, let me give you a tip. In the final
// solution for this one, I replace `React.useReducer` with a custom hook:
// const [state, dispatch] = useControlledReducer(reducer, initialState, {
//   controlledState,
//   onChange,
// })
// That custom hook is responsible for managing EVERYTHING. The rest of the
// `useToggle` function looks just as if you weren't doing control props at all.
// Good luck!

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Toggle({on: controlledOn, onChange}) {
  // 💯 I, Hannah Hundred, give you permission to edit this function for
  // the extra credit outlined above. 😘
  const {on, getTogglerProps} = useToggle({on: controlledOn, onChange})
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

function Usage() {
  const [bothOn, setBothOn] = React.useState(false)
  const [timesClicked, setTimesClicked] = React.useState(0)

  function handleToggleChange(state, action) {
    if (action.type === useToggle.types.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick(params) {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}
Usage.title = 'Control Props'

export default Usage
// we're adding the Toggle export for tests
export {Toggle}
