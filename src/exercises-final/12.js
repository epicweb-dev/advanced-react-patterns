// higher order components
import React, {Fragment} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import {Switch} from '../switch'

const ToggleContext = React.createContext()

class Toggle extends React.Component {
  static Consumer = ToggleContext.Consumer
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  state = {on: false, toggle: this.toggle}
  render() {
    return (
      <ToggleContext.Provider value={this.state} {...this.props} />
    )
  }
}

function withToggle(Component) {
  function Wrapper(props, ref) {
    return (
      <Toggle.Consumer>
        {toggleContext => (
          <Component toggle={toggleContext} {...props} ref={ref} />
        )}
      </Toggle.Consumer>
    )
  }
  Wrapper.displayName = `withToggle(${Component.displayName ||
    Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}

const Layer1 = () => <Layer2 />
const Layer2 = withToggle(({toggle: {on}}) => (
  <Fragment>
    {on ? 'The button is on' : 'The button is off'}
    <Layer3 />
  </Fragment>
))
const Layer3 = () => <Layer4 />
const Layer4 = withToggle(({toggle: {on, toggle}}) => (
  <Switch on={on} onClick={toggle} />
))

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Higher Order Components'

export {Toggle, withToggle, Usage as default}
