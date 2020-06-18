import React from 'react'
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
  expect(
    console.error,
    'Make sure the error message explains you can use a "readOnly" prop',
  ).toHaveBeenCalledWith(expect.stringMatching(/readOnly/i))
  expect(
    console.error,
    'Make sure the error message explains you can use a "onChange" prop',
  ).toHaveBeenCalledWith(expect.stringMatching(/onChange/i))
  expect(
    console.error,
    'Make sure the error message explains you can use an "initialOn" prop',
  ).toHaveBeenCalledWith(expect.stringMatching(/initialOn/i))
  expect(console.error).toHaveBeenCalledTimes(1)
})

test('no warning for controlled component with onChange prop', () => {
  render(<Toggle on={false} onChange={() => {}} />)
  expect(console.error).toHaveBeenCalledTimes(0)
})

test('no warning for controlled component with readOnly prop', () => {
  render(<Toggle on={false} readOnly={true} />)
  expect(
    console.error,
    'Make sure you forward the readOnly prop to the hook',
  ).toHaveBeenCalledTimes(0)
})

test('warning for changing from controlled to uncontrolled', () => {
  function Example() {
    const [state, setState] = React.useState(true)
    return <Toggle on={state} onChange={() => setState(undefined)} />
  }
  render(<Example />)
  userEvent.click(screen.getByLabelText(/toggle/i))
  expect(
    console.error,
    `Make sure to explain that it's changing "from controlled to uncontrolled"`,
  ).toHaveBeenCalledWith(
    expect.stringMatching(/from controlled to uncontrolled/i),
  )
})

test('warning for changing from uncontrolled to controlled', () => {
  function Example() {
    const [state, setState] = React.useState(undefined)
    return <Toggle on={state} onChange={() => setState(true)} />
  }
  render(<Example />)
  userEvent.click(screen.getByLabelText(/toggle/i))
  expect(
    console.error,
    `Make sure to explain that it's changing "from uncontrolled to controlled"`,
  ).toHaveBeenCalledWith(
    expect.stringMatching(/from uncontrolled to controlled/i),
  )
})
