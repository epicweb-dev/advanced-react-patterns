// The provider pattern
import React, {Fragment} from 'react'
import {Switch} from '../switch'

// 🐨 create your React context here with React.createContext

class Toggle extends React.Component {
  // 🐨 expose the ToggleContext.Consumer as a static property of Toggle here.
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    // 🐨 replace this with rendering the ToggleContext.Provider
    return this.props.children({
      on: this.state.on,
      toggle: this.toggle,
    })
  }
}

// 💯 Extra credit: Add a custom Consumer that validates the
// ToggleContext.Consumer is rendered within a provider
//
// 💯 Extra credit: avoid unecessary re-renders by only updating the value when
// state changes
//
// 💯 Extra credit: support render props as well
//
// 💯 Extra credit: support (and expose) compound components!

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
const Layer1 = () => <Layer2 />
const Layer2 = () => (
  <Toggle.Consumer>
    {({on}) => (
      <Fragment>
        {on ? 'The button is on' : 'The button is off'}
        <Layer3 />
      </Fragment>
    )}
  </Toggle.Consumer>
)
const Layer3 = () => <Layer4 />
const Layer4 = () => (
  <Toggle.Consumer>
    {({on, toggle}) => <Switch on={on} onClick={toggle} />}
  </Toggle.Consumer>
)

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}

/*
// without the changes you're going to make,
// this is what the usage would look like. You're looking at "prop drilling"

const Layer1 = ({on, toggle}) => <Layer2 on={on} toggle={toggle} />
const Layer2 = ({on, toggle}) => (
  <Fragment>
    {on ? 'The button is on' : 'The button is off'}
    <Layer3 on={on} toggle={toggle} />
  </Fragment>
)
const Layer3 = ({on, toggle}) => <Layer4 on={on} toggle={toggle} />
const Layer4 = ({on, toggle}) => <Switch on={on} onClick={toggle} />

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle}) => <Layer1 on={on} toggle={toggle} />}
    </Toggle>
  )
}
*/

Usage.title = 'The Provider Pattern'

export {Toggle, Usage as default}
