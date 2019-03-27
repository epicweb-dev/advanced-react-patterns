// control props primer
// Add support for a `type` in the changes so consumers can differentiate the
// different state updates

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  static defaultProps = {
    onToggle: () => {},
    onStateChange: () => {},
  }
  static stateChangeTypes = {
    toggle: '__toggle__',
    toggleOn: '__toggle_on__',
    toggleOff: '__toggle_off__',
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
  internalSetState(changes, callback = () => {}) {
    let allChanges
    this.setState(
      state => {
        const combinedState = this.getState(state)
        const changesObject =
          typeof changes === 'function'
            ? changes(combinedState)
            : changes

        allChanges = changesObject
        const {type: ignoredType, ...onlyChanges} = changesObject

        const nonControlledChanges = Object.entries(
          onlyChanges,
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
        this.props.onStateChange(allChanges, this.getState())
        callback()
      },
    )
  }
  toggle = ({
    on: newState,
    type = Toggle.stateChangeTypes.toggle,
  } = {}) => {
    this.internalSetState(
      ({on}) => ({
        on: typeof newState === 'boolean' ? newState : !on,
        type,
      }),
      () => {
        this.props.onToggle(this.getState().on)
      },
    )
  }
  handleSwitchClick = () => this.toggle()
  handleOffClick = () =>
    this.toggle({on: false, type: Toggle.stateChangeTypes.toggleOff})
  handleOnClick = () =>
    this.toggle({on: true, type: Toggle.stateChangeTypes.toggleOn})
  render() {
    return (
      <div>
        <Switch
          on={this.getState().on}
          onClick={this.handleSwitchClick}
        />
        <button onClick={this.handleOffClick}>off</button>
        <button onClick={this.handleOnClick}>on</button>
      </div>
    )
  }
}

class Usage extends React.Component {
  state = {bothOn: false}
  lastWasButton = false
  handleStateChange = changes => {
    const isButtonChange =
      changes.type === Toggle.stateChangeTypes.toggleOn ||
      changes.type === Toggle.stateChangeTypes.toggleOff
    if (
      changes.type === Toggle.stateChangeTypes.toggle ||
      (this.lastWasButton && isButtonChange)
    ) {
      this.setState({bothOn: changes.on})
      this.lastWasButton = false
    } else {
      this.lastWasButton = isButtonChange
    }
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
