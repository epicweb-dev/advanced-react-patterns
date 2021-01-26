// Control Props
// http://localhost:3000/isolated/final-ts/06.extra-3.tsx

import * as React from 'react'
import warning from 'warning'
import {Switch} from '../switch'

// #region 'src/hooks/use-warnings'
function useControlledSwitchWarning(
  controlPropValue: any,
  controlPropName: string,
  componentName: string,
): void {
  const isControlled = controlPropValue != null
  const {current: wasControlled} = React.useRef(isControlled)

  React.useEffect(() => {
    warning(
      !(isControlled && !wasControlled),
      `\`${componentName}\` is changing from uncontrolled to be controlled. Components should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
    warning(
      !(!isControlled && wasControlled),
      `\`${componentName}\` is changing from controlled to be uncontrolled. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component. Check the \`${controlPropName}\` prop.`,
    )
  }, [componentName, controlPropName, isControlled, wasControlled])
}

function useOnChangeReadOnlyWarning(
  controlPropValue: any,
  controlPropName: string,
  componentName: string,
  hasOnChange: boolean,
  readOnly: boolean,
  readOnlyProp: string,
  initialValueProp: string,
  onChangeProp: string,
): void {
  const isControlled = controlPropValue != null
  React.useEffect(() => {
    warning(
      !(!hasOnChange && isControlled && !readOnly),
      `A \`${controlPropName}\` prop was provided to \`${componentName}\` without an \`${onChangeProp}\` handler. This will result in a read-only \`${controlPropName}\` value. If you want it to be mutable, use \`${initialValueProp}\`. Otherwise, set either \`${onChangeProp}\` or \`${readOnlyProp}\`.`,
    )
  }, [
    componentName,
    controlPropName,
    isControlled,
    hasOnChange,
    readOnly,
    onChangeProp,
    initialValueProp,
    readOnlyProp,
  ])
}
// export {useControlledSwitchWarning, useOnChangeReadOnlyWarning}
// #endregion 'src/hooks/use-warnings'

// #region  'src/hooks/use-toggle'
// import {
//   useControlledSwitchWarning,
//   useOnChangeReadOnlyWarning,
// } from 'src/hooks/use-warnings'
// #region Interface
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
// #endregion Interface

const callAll: CallAll = (...fns) => (...args) =>
  fns.forEach(fn => fn?.(...args))

type State = {on: boolean}
type Action = {type: 'toggle'} | {type: 'reset'; initialState: State}

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
} as const

const toggleReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case actionTypes.toggle: {
      return {on: !state.on}
    }
    case actionTypes.reset: {
      return action.initialState
    }
    default: {
      // @ts-expect-error: Property 'type' does not exist on type 'never'.
      throw new Error(`Unsupported type: ${action.type}`)
    }
  }
}

interface ToggleBag extends ToggleImperativeAPI {
  getTogglerProps: GetTogglerProps
  getResetterProps: GetResetterProps
}
function useToggle<
  ToggleOptions extends {
    initialOn?: boolean
    reducer?: typeof toggleReducer
    onChange?: (state: State, action: Action) => void
    on?: boolean
    readOnly?: boolean
  }
>(
  {
    initialOn = false,
    reducer = toggleReducer,
    onChange,
    on: controlledOn,
    readOnly = false,
  } = {} as ToggleOptions,
): ToggleBag {
  const {current: initialState} = React.useRef({on: initialOn})
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const onIsControlled = controlledOn != null
  const on = onIsControlled ? controlledOn! : state.on

  useControlledSwitchWarning(controlledOn, 'on', 'useToggle')
  useOnChangeReadOnlyWarning(
    controlledOn,
    'on',
    'useToggle',
    Boolean(onChange),
    readOnly,
    'readOnly',
    'initialOn',
    'onChange',
  )

  function dispatchWithOnChange(action: Action): void {
    if (!onIsControlled) {
      dispatch(action)
    }
    onChange?.(reducer({...state, on}, action), action)
  }

  const toggle = () => dispatchWithOnChange({type: actionTypes.toggle})
  const reset = () =>
    dispatchWithOnChange({type: actionTypes.reset, initialState})

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
    return {onClick: callAll(onClick, reset), ...props}
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  }
}
// export {useToggle, toggleReducer, ActionType, Action, State}
// #endregion  'src/hooks/use-toggle'

// #region 'src/components/toggle'
// import {Switch} from 'src/components/switch'
// import {useToggle} from 'src/hooks/use-toggle'
type ToggleProps = {
  on?: boolean
  onChange?: (state: State, action: Action) => void
  readOnly?: boolean
}
function Toggle({
  on: controlledOn,
  onChange,
  readOnly,
}: ToggleProps): JSX.Element {
  const {on, getTogglerProps} = useToggle({
    on: controlledOn,
    onChange,
    readOnly,
  })
  const props = getTogglerProps({on})
  return <Switch {...props} />
}

// export {Toggle}
//#endregion 'src/components/toggle'

// #region 'src/app'
// import { Toggle } from 'src/components/toggle';
function App(): JSX.Element {
  const [bothOn, setBothOn] = React.useState<boolean>(false)
  const [timesClicked, setTimesClicked] = React.useState<number>(0)

  function handleToggleChange(state: State, action: Action): void {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return
    }
    setBothOn(state.on)
    setTimesClicked(c => c + 1)
  }

  function handleResetClick(): void {
    setBothOn(false)
    setTimesClicked(0)
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  )
}

export default App
export {Toggle} // we're adding the Toggle export for tests

//# endregion
