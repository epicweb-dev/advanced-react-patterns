import React from 'react'
import {fireEvent, renderToggle} from '../../test/utils'
import Usage, {Toggle} from '../exercises-final/06'
// import Usage, {Toggle} from '../exercises/06'

test('toggling either toggle toggles both', () => {
  const {getAllByTestId} = renderToggle(<Usage />)
  const buttons = getAllByTestId('toggle-input')
  const [toggleButton1, toggleButton2] = buttons
  fireEvent.click(toggleButton1)
  expect(toggleButton1).toBeOn()
  expect(toggleButton2).toBeOn()

  fireEvent.click(toggleButton2)
  expect(toggleButton1).toBeOff()
  expect(toggleButton2).toBeOff()
})

test('toggle can still be uncontrolled', () => {
  const {toggleButton, toggle} = renderToggle(<Toggle />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
})
