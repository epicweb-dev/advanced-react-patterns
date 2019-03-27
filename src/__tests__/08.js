import React from 'react'
import {renderToggle, fireEvent} from '../../test/utils'
import Usage from '../exercises-final/08'
// import Usage from '../exercises/08'

test('renders a toggle component', () => {
  const handleToggle = jest.fn()
  const {toggleButton, toggle} = renderToggle(
    <Usage onToggle={handleToggle} />,
  )
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(handleToggle).toHaveBeenCalledTimes(1)
  expect(handleToggle).toHaveBeenCalledWith(true)
})

test('can click too much', () => {
  const handleToggle = jest.fn()
  const handleReset = jest.fn()
  const {
    toggleButton,
    toggle,
    getByTestId,
    queryByTestId,
    getByText,
  } = renderToggle(
    <Usage onToggle={handleToggle} onReset={handleReset} />,
  )
  expect(toggleButton).toBeOff()
  toggle() // 1
  expect(toggleButton).toBeOn()
  toggle() // 2
  expect(toggleButton).toBeOff()
  expect(getByTestId('click-count')).toHaveTextContent('2')
  toggle() // 3
  expect(toggleButton).toBeOn()
  toggle() // 4
  expect(toggleButton).toBeOff()
  toggle() // 5: Whoa, too many
  expect(toggleButton).toBeOff()
  toggle() // 6
  expect(toggleButton).toBeOff()

  expect(getByTestId('notice')).not.toBeNull()
  expect(handleToggle).toHaveBeenCalledTimes(6)
  expect(handleToggle.mock.calls).toEqual([
    [true], // 1
    [false], // 2
    [true], // 3
    [false], // 4
    [false], // 5
    [false], // 6
  ])

  fireEvent.click(getByText('Reset'))
  expect(handleReset).toHaveBeenCalledTimes(1)
  expect(handleReset).toHaveBeenCalledWith(false)
  expect(queryByTestId('notice')).toBeNull()

  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()

  expect(getByTestId('click-count')).toHaveTextContent('1')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react%20patterns&e=08&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
