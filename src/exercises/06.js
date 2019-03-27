// prop getters

import React from 'react'
import {Switch} from '../switch'

// Check out the previous usage example. How would someone pass
// a custom `onClick` handler? It'd be pretty tricky! It'd be
// easier to just not use the `togglerProps` prop collection!
//
// What if instead we exposed a function which merged props?
// Let's do that instead. 🐨 Swap `togglerProps` with a `getTogglerProps`
// function. It should accept props and merge the provided props
// with the ones we need to get our toggle functionality to work
//
// 💰 Here's a little utility that might come in handy
// const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      togglerProps: {
        'aria-pressed': this.state.on,
        onClick: this.toggle,
      },
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => console.log('onButtonClick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, getTogglerProps}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button
            {...getTogglerProps({
              'aria-label': 'custom-button',
              onClick: onButtonClick,
              id: 'custom-button-id',
            })}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Prop Getters'

export {Toggle, Usage as default}
