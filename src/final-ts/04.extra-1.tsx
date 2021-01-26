// Prop Collections and Getters
// 💯 prop getters
// http://localhost:3000/isolated/final-ts/04.extra-1.tsx

import * as React from 'react'
import {Switch} from '../switch'

// don't spend too much time on this generic function signature
type CallAll = <
  Fns extends Array<((...args: unknown[]) => unknown) | undefined>,
  Args extends unknown[]
>(
  ...fns: [...Fns]
) => (...args: [...Args]) => void

/**
 * an utility function that help you call multiple functions in sequence
 * @example
 *  const onclick = callAll(onClick, toggle)
 */
const callAll: CallAll = (...fns) => (...args) =>
  fns.forEach(fn => fn?.(...args))

interface GetTogglerProps {
  <
    T extends Partial<TogglerProps> &
      Partial<ToggleImperativeAPI> & {[AttributeName: string]: unknown}
  >(
    attributes?: T,
  ): TogglerProps & Omit<T, 'onClick'>
}

interface TogglerProps {
  'aria-pressed': boolean
  onClick: (...args: unknown[]) => void
}

interface ToggleImperativeAPI {
  on: boolean
  toggle: () => void
}

interface ToggleBag extends ToggleImperativeAPI {
  getTogglerProps: GetTogglerProps
}
function useToggle(): ToggleBag {
  const [on, setOn] = React.useState<boolean>(false)
  const toggle = () => setOn(!on)
  function getTogglerProps<
    T extends Partial<TogglerProps> &
      Partial<ToggleImperativeAPI> & {[AttributeName: string]: unknown}
  >({onClick, ...props} = {} as T) {
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

function App(): JSX.Element {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App
