// state reducer

import React from 'react'
import {Switch} from '../switch'

// 🦉 Sometimes, just being made aware of the changes that occur internally
// isn't enough and what you really want is the ability to completely control
// how state updates are being made.
//
// In this example, we want to prevent the toggle from updating the toggle state
// after it's been clicked 4 times in a row before resetting.
//
// We could definitely add an option to our component and add that logic in our
// reducer, but there's a neverending list of logical customizations that people
// could want out of our custom hook and we don't want to have to code for every
// one of those cases.
//
// So instead we're going to apply a computer science pattern called
// "Inversion of Control" where we effectively say: "Here you go! You have
// complete control over how this thing works. It's now your responsibility."
//
// As an asside, before React Hooks were a thing, this was pretty tricky to
// implement and resulted in pretty weird code, but with useReducer, this is WAY
// better. I ❤️ hooks. 😍

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    case 'reset': {
      return initialState
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
function useToggle({onToggle = noop, onReset = noop, initialOn = false} = {}) {
  const {current: initialState} = React.useRef({on: initialOn})
  // 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
  // provided as an option
  // ... and that's it! Don't forget to check the 💯 extra credit below!
  const [state, dispatch] = React.useReducer(toggleReducer, initialState)
  const {on} = state

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  function reset() {
    dispatch({type: 'reset', initialState})
    onReset(initialState.on)
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

// 💯 Our `toggleReducer` is pretty simple, so it's not a huge pain for people
// to implement their own. However, in a more realistic scenario, people may
// struggle with having to basically re-implement our entire reducer which could
// be pretty complex.
// So see if you can provide a nice way for people to be able to use the
// `toggleReducer` themselves if they so choose. Feel free to test this out by
// changing the Usage example below (even though I say don't make changes) to
// use the default reducer instead of having to re-implement what to do when
// the action type is 'reset'

// 💯 Requiring people to know what action types are available and code them
// is just asking for bug-inducing typos. See if you can figure out a good way
// to help people avoid typos in those strings by perhaps putting all possible
// action types on an object somewhere and referencing them instead of hard
// coding them.

// 💯 Here's a fun one... Something that would be bad news is if folks start
// using our reducer to store state in our reducer that the toggle shouldn't
// be managing itself. So try this: In the usage below, update it to return
// an extra property (for example: `return {on: state.on, foo: 'bar'}`). Then
// write the code to log a warning if they do that. In my finished example,
// I create a generic custom hook called `useReducerWithValidation`.

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const [timesClicked, setTimesClicked] = React.useState(0)

  function toggleStateReducer(state, action) {
    // 💯 I, Hannah Hundred, give you permission to edit this function for
    // the extra credit outlined above. 😘
    switch (action.type) {
      case 'toggle': {
        if (timesClicked >= 4) {
          return {on: state.on}
        }
        return {on: !state.on}
      }
      case 'reset': {
        return {on: false}
      }
      default: {
        throw new Error(`Unsupported type: ${action.type}`)
      }
    }
  }

  const {on, getTogglerProps, reset} = useToggle({
    reducer: toggleStateReducer,
    onToggle: (...args) => {
      setTimesClicked(clicks => clicks + 1)
      console.info('onToggle', ...args)
    },
    onReset: (...args) => {
      setTimesClicked(0)
      console.info('onReset', ...args)
    },
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          on: on,
        })}
      />
      {timesClicked >= 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button onClick={reset}>Reset</button>
    </div>
  )
}
Usage.title = 'State Reducers'

export default Usage
