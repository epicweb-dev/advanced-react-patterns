// control props primer
// this makes the `getState` function more flexible

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}
  isControlled(prop) {
    return this.props[prop] !== undefined
  }
  getState() {
    return Object.entries(this.state).reduce(
      (combinedState, [key, value]) => {
        if (this.isControlled(key)) {
          combinedState[key] = this.props[key]
        } else {
          combinedState[key] = value
        }
        return combinedState
      },
      {},
    )
  }
  toggle = () => {
    if (this.isControlled('on')) {
      this.props.onToggle(!this.getState().on)
    } else {
      this.setState(
        ({on}) => ({on: !on}),
        () => {
          this.props.onToggle(this.getState().on)
        },
      )
    }
  }
  render() {
    return <Switch on={this.getState().on} onClick={this.toggle} />
  }
}

class Usage extends React.Component {
  state = {bothOn: false}
  handleToggle = on => {
    this.setState({bothOn: on})
  }
  render() {
    const {bothOn} = this.state
    const {toggle1Ref, toggle2Ref} = this.props
    return (
      <div>
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle1Ref}
        />
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle2Ref}
        />
      </div>
    )
  }
}
Usage.title = 'Control Props'

export {Toggle, Usage as default}
