// http://localhost:3000/isolated/examples/resetting-via-key-prop.tsx

// this is basically the same as the state initializer except the component
// we export at the bottom. Check that out.

import * as React from 'react'
import {Switch} from '../switch'

function callAll<Args extends Array<unknown>>(
  ...fns: Array<((...args: Args) => unknown) | undefined>
) {
  return (...args: Args) => fns.forEach(fn => fn?.(...args))
}

type ToggleState = {on: boolean}
type ToggleAction = {type: 'toggle'}

function toggleReducer(state: ToggleState, action: ToggleAction) {
  switch (action.type) {
    case 'toggle': {
      return {on: !state.on}
    }
  }
}

function useToggle({initialOn = false} = {}) {
  const [state, dispatch] = React.useReducer(toggleReducer, {on: initialOn})
  const {on} = state

  const toggle = () => dispatch({type: 'toggle'})

  function getTogglerProps<Props>({
    onClick,
    ...props
  }: {onClick?: React.DOMAttributes<HTMLButtonElement>['onClick']} & Props) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    getTogglerProps,
  }
}

function App({onReset}: {onReset: () => void}) {
  const {on, getTogglerProps} = useToggle({initialOn: true})

  return (
    <div>
      <Switch {...getTogglerProps({on: on})} />
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

function AppResetter() {
  const [key, setKey] = React.useState(0)
  const handleReset = () => setKey(k => k + 1)
  return <App key={key} onReset={handleReset} />
}

export default AppResetter
// we're adding the useToggle export for tests
export {useToggle}
