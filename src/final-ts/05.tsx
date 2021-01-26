// state reducer
// http://localhost:3000/isolated/final-ts/05.tsx

import * as React from 'react'
import {Switch} from '../switch'

//#region Interfaces
type CallAll = <
  Fns extends Array<((...args: unknown[]) => unknown) | undefined>,
  Args extends unknown[]
>(
  ...fns: [...Fns]
) => (...args: [...Args]) => void

interface TogglerProps {
  'aria-pressed': boolean
  onClick: (...args: unknown[]) => void
}
interface ResetterProps {
  onClick: (...args: unknown[]) => void
}

interface ToggleImperativeAPI {
  on: boolean
  toggle: () => void
  reset: () => void
}

interface GetTogglerProps {
  <
    T extends Partial<TogglerProps> &
      Partial<ToggleImperativeAPI> & {[AttributeName: string]: unknown}
  >(
    attributes?: T,
  ): TogglerProps & Omit<T, 'onClick'>
}
interface GetResetterProps {
  <
    T extends Partial<ResetterProps> &
      Partial<ToggleImperativeAPI> & {[AttributeName: string]: unknown}
  >(
    attributes?: T,
  ): ResetterProps & Omit<T, 'onClick'>
}

interface ToggleBag extends ToggleImperativeAPI {
  getTogglerProps: GetTogglerProps
  getResetterProps: GetResetterProps
}

//#endregion Interfaces
const callAll: CallAll = (...fns) => (...args) =>
  fns.forEach(fn => fn?.(...args))

type ToggleState = {on: boolean}
type ToggleAction =
  | {type: 'toggle'}
  | {type: 'reset'; initialState: ToggleState}
function toggleReducer(state: ToggleState, action: ToggleAction): ToggleState {
  switch (action.type) {
    case 'toggle':
      return {on: !state.on}

    case 'reset':
      return action.initialState

    default: {
      // @ts-expect-error: Property 'type' does not exist on type 'never'.ts(2339)
      throw new Error(`Unsupported type: ${action.type}`)
    }
  }
}

function useToggle<
  Option extends {
    initialOn?: boolean
    reducer?: typeof toggleReducer
  }
>({initialOn = false, reducer = toggleReducer} = {} as Option): ToggleBag {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {on} = state

  const toggle = () => dispatch({type: 'toggle'})
  const reset = () => dispatch({type: 'reset', initialState})

  function getTogglerProps<
    T extends Partial<TogglerProps> &
      Partial<ToggleImperativeAPI> & {[AttributeName: string]: unknown}
  >({onClick, ...props} = {} as T): TogglerProps & Omit<T, 'onClick'> {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  function getResetterProps<
    T extends Partial<ResetterProps> &
      Partial<ToggleImperativeAPI> & {[AttributeName: string]: unknown}
  >({onClick, ...props} = {} as T): ResetterProps & Omit<T, 'onClick'> {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    }
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState<number>(0)
  const clickedTooMuch: boolean = timesClicked >= 4

  type ToggleState = {on: boolean}
  type ToggleAction = {type: 'toggle'} | {type: 'reset'}

  function toggleStateReducer(
    state: ToggleState,
    action: ToggleAction,
  ): ToggleState {
    switch (action.type) {
      case 'toggle':
        return clickedTooMuch ? {on: state.on} : {on: !state.on}

      case 'reset':
        return {on: false}

      default: {
        // @ts-expect-error Property 'type' does not exist on type 'never'.ts(2339)
        throw new Error(`Unsupported type: ${action.type}`)
      }
    }
  }

  const {on, getTogglerProps, getResetterProps} = useToggle({
    reducer: toggleStateReducer,
  })

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({onClick: () => setTimesClicked(0)})}>
        Reset
      </button>
    </div>
  )
}

export default App
