// The provider pattern
import React, {Fragment} from 'react'
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

const Layer1 = () => <Layer2 />
const Layer2 = () => {
  const {on} = useToggle()
  return (
    <Fragment>
      {on ? 'The button is on' : 'The button is off'}
      <Layer3 />
    </Fragment>
  )
}
const Layer3 = () => <Layer4 />
const Layer4 = () => {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} />
}

function Usage({onToggle = (...args) => console.info('onToggle', ...args)}) {
  return (
    <Toggle onToggle={onToggle}>
      <Layer1 />
    </Toggle>
  )
}
Usage.title = 'Provider Pattern'

export {Toggle, Usage as default}
