// higher order components
import React, {Fragment} from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
function useToggle() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`,
    )
  }
  return context
}

function Toggle({onToggle, ...rest}) {
  const [on, setOn] = React.useState(false)

  const toggle = React.useCallback(() => {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }, [onToggle, on])

  const value = React.useMemo(() => ({on, toggle}), [on, toggle])

  return <ToggleContext.Provider value={value} {...rest} />
}

function withToggle(Component) {
  const Wrapper = (props, ref) => (
    <Component toggle={useToggle()} {...props} ref={ref} />
  )
  Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
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

function Usage({onToggle = (...args) => console.info('onToggle', ...args)}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Higher Order Components'

export {Toggle, withToggle, Usage as default}
