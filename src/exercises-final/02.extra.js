// Compound Components

import React from 'react'
import {Switch} from '../switch'

function componentHasChild(child) {
  for (const property in Toggle) {
    if (Toggle.hasOwnProperty(property)) {
      if (child.type === Toggle[property]) {
        return true
      }
    }
  }
  return false
}

class Toggle extends React.Component {
  static On = ({on, children}) => (on ? children : null)
  static Off = ({on, children}) => (on ? null : children)
  static Button = ({on, toggle, ...props}) => (
    <Switch on={on} onClick={toggle} {...props} />
  )
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    return React.Children.map(this.props.children, child => {
      if (componentHasChild(child)) {
        return React.cloneElement(child, {
          on: this.state.on,
          toggle: this.toggle,
        })
      }
      return child
    })
  }
}

const Hi = () => <h4>Hi</h4>
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
      <span>Hello</span>
      <Hi />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
