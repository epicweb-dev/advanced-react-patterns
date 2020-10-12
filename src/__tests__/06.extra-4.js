import React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Toggle} from '../final/06.extra-4'
// import {Toggle} from '../exercise/06'

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test('warning for controlled component without onChange', () => {
  render(<Toggle on={false} />)
  alfredTip(
    () =>
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/readOnly/i),
      ),
    'Make sure the error message explains you can use a "readOnly" prop',
  )
  alfredTip(
    () =>
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/onChange/i),
      ),
    'Make sure the error message explains you can use a "onChange" prop',
  )
  alfredTip(
    () =>
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/initialOn/i),
      ),
    'Make sure the error message explains you can use an "initialOn" prop',
  )
  expect(console.error).toHaveBeenCalledTimes(1)
})

test('no warning for controlled component with onChange prop', () => {
  render(<Toggle on={false} onChange={() => {}} />)
  expect(console.error).toHaveBeenCalledTimes(0)
})

test('no warning for controlled component with readOnly prop', () => {
  render(<Toggle on={false} readOnly={true} />)
  alfredTip(
    () => expect(console.error).toHaveBeenCalledTimes(0),
    'Make sure you forward the readOnly prop to the hook',
  )
})

test('warning for changing from controlled to uncontrolled', () => {
  function Example() {
    const [state, setState] = React.useState(true)
    return <Toggle on={state} onChange={() => setState(undefined)} />
  }
  render(<Example />)
  userEvent.click(screen.getByLabelText(/toggle/i))
  alfredTip(
    () =>
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/from controlled to uncontrolled/i),
      ),
    `Make sure to explain that it's changing "from controlled to uncontrolled"`,
  )
})

test('warning for changing from uncontrolled to controlled', () => {
  function Example() {
    const [state, setState] = React.useState(undefined)
    return <Toggle on={state} onChange={() => setState(true)} />
  }
  render(<Example />)
  userEvent.click(screen.getByLabelText(/toggle/i))
  alfredTip(
    () =>
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(/from uncontrolled to controlled/i),
      ),
    `Make sure to explain that it's changing "from uncontrolled to controlled"`,
  )
})
