// The provider pattern
import React, {Fragment} from 'react'
// 🐨 you're going to need this :)
// import hoistNonReactStatics from 'hoist-non-react-statics'
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
  return Component
  // The `withToggle` function is called a "Higher Order Component"
  // It's another way to share code and allows you to statically
  // create new components to render.
  // The basic idea is you create a new component that renders the
  // component the HOC is given.
  //
  // This presents a few issues that we'll have to deal with in our
  // component.
  //
  // 1. 🐨 create and return a function component called "Wrapper" which renders
  //    a <Toggle.Consumer> with a child function that renders <Component />
  //    with the props Wrapper is given as well as a toggle prop
  // 2. 🐨 Handle `ref`s properly by using React.forwardRef:
  //    https://reactjs.org/docs/forwarding-refs.html
  //    💰 You can make your Wrapper function accept a second argument called
  //    `ref` and `return React.forwardRef(Wrapper)` instead of the
  //    `return Component` we already have above.
  // 3. 🐨 Make it easier to debug using the React DevTools by setting a
  //    useful `displayName` property on the Wrapper.
  //    💰 `Wrapper.displayName = ...`
  // 4. 🐨 Use the `hoistNonReactStatics` function (uncomment the imported above)
  //    by calling it with the Wrapper and the Component to forward all the
  //    static properties from the Component to the Wrapper
  //    💰 `return hoistReactStatics(React.forwardRef(Wrapper), Component)`
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
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
