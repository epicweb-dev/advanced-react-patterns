import React from 'react'
import {renderToggle, screen, fireEvent} from '../../test/utils'
import Usage, {Toggle} from '../final/06'
// import Usage, {Toggle} from '../exercise/06'

test('toggling either toggle toggles both', () => {
  renderToggle(<Usage />)
  const buttons = screen.getAllByTestId('toggle-input')
  const [toggleButton1, toggleButton2] = buttons
  fireEvent.click(toggleButton1)
  expect(toggleButton1).toBeChecked()
  expect(toggleButton2).toBeChecked()

  fireEvent.click(toggleButton2)
  expect(toggleButton1).not.toBeChecked()
  expect(toggleButton2).not.toBeChecked()
})

test('toggle can still be uncontrolled', () => {
  const {toggleButton, toggle} = renderToggle(<Toggle />)
  expect(toggleButton).not.toBeChecked()
  toggle()
  expect(toggleButton).toBeChecked()
})
