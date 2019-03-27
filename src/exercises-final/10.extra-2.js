// control props primer
// this adds support for a `onStateChange` prop

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  static defaultProps = {
    onToggle: () => {},
    onStateChange: () => {},
  }
  state = {on: false}
  isControlled(prop) {
    return this.props[prop] !== undefined
  }
  getState(state = this.state) {
    return Object.entries(state).reduce(
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
  internalSetState(changes, callback) {
    let allChanges
    this.setState(
      state => {
        const combinedState = this.getState(state)
        const changesObject =
          typeof changes === 'function'
            ? changes(combinedState)
            : changes
        allChanges = changesObject
        const nonControlledChanges = Object.entries(
          changesObject,
        ).reduce((newChanges, [key, value]) => {
          if (!this.isControlled(key)) {
            newChanges[key] = value
          }
          return newChanges
        }, {})

        return Object.keys(nonControlledChanges).length
          ? nonControlledChanges
          : null
      },
      () => {
        this.props.onStateChange(allChanges)
        callback()
      },
    )
  }
  toggle = () => {
    this.internalSetState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.getState().on)
      },
    )
  }
  render() {
    return <Switch on={this.getState().on} onClick={this.toggle} />
  }
}

class Usage extends React.Component {
  state = {bothOn: false}
  handleStateChange = ({on}) => {
    this.setState({bothOn: on})
  }
  render() {
    const {bothOn} = this.state
    const {toggle1Ref, toggle2Ref} = this.props
    return (
      <div>
        <Toggle
          on={bothOn}
          onStateChange={this.handleStateChange}
          ref={toggle1Ref}
        />
        <Toggle
          on={bothOn}
          onStateChange={this.handleStateChange}
          ref={toggle2Ref}
        />
      </div>
    )
  }
}
Usage.title = 'Control Props'

export {Toggle, Usage as default}
