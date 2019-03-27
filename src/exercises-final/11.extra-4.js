// The provider pattern
// Extra credit: support (and expose) compound components
import React, {Fragment} from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function ToggleConsumer(props) {
  return (
    <ToggleContext.Consumer {...props}>
      {context => {
        if (!context) {
          throw new Error(
            `Toggle.Consumer cannot be rendered outside the Toggle component`,
          )
        }
        return props.children(context)
      }}
    </ToggleContext.Consumer>
  )
}

class Toggle extends React.Component {
  static Consumer = ToggleConsumer
  static On = ({children}) => (
    <ToggleConsumer>
      {({on}) => (on ? children : null)}
    </ToggleConsumer>
  )
  static Off = ({children}) => (
    <ToggleConsumer>
      {({on}) => (on ? null : children)}
    </ToggleConsumer>
  )
  static Button = props => (
    <ToggleConsumer>
      {({on, toggle}) => (
        <Switch on={on} onClick={toggle} {...props} />
      )}
    </ToggleConsumer>
  )
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  state = {on: false, toggle: this.toggle}
  render() {
    const {children, ...rest} = this.props
    const ui =
      typeof children === 'function' ? children(this.state) : children
    return (
      <ToggleContext.Provider value={this.state} {...rest}>
        {ui}
      </ToggleContext.Provider>
    )
  }
}

const Layer1 = () => <Layer2 />
const Layer2 = () => (
  <Fragment>
    <Toggle.On>The button is on</Toggle.On>
    <Toggle.Off>The button is off</Toggle.Off>
    <Layer3 />
  </Fragment>
)
const Layer3 = () => <Layer4 />
const Layer4 = () => <Toggle.Button />

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}

export {Toggle, Usage as default}
