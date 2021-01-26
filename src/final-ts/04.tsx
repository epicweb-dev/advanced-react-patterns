// Prop Collections and Getters
// http://localhost:3000/isolated/final-ts/04.tsx

import * as React from 'react'
import {Switch} from '../switch'

type TogglerProps = Readonly<{
  'aria-pressed': boolean
  onClick: () => void
}>

interface ToggleBag {
  readonly on: boolean
  readonly toggle: () => void
  readonly togglerProps: TogglerProps
}

function useToggle(): ToggleBag {
  const [on, setOn] = React.useState<boolean>(false)
  const toggle = () => setOn(!on)

  return {
    on,
    toggle,
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle,
    },
  } as const
}

function App(): JSX.Element {
  const {on, togglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App
