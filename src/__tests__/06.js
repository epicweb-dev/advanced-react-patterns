import * as React from 'react'
import {renderToggle, screen, userEvent} from '../../test/utils'
import App, {Toggle} from '../final/06'
// import App, {Toggle} from '../exercise/06'

test('toggling either toggle toggles both', () => {
  renderToggle(<App />)
  const buttons = screen.getAllByTestId('toggle-input')
  const [toggleButton1, toggleButton2] = buttons
  userEvent.click(toggleButton1)
  expect(toggleButton1).toBeChecked()
  expect(toggleButton2).toBeChecked()

  userEvent.click(toggleButton2)
  expect(toggleButton1).not.toBeChecked()
  expect(toggleButton2).not.toBeChecked()
})

test('toggle can still be uncontrolled', () => {
  const {toggleButton, toggle} = renderToggle(<Toggle />)
  expect(toggleButton).not.toBeChecked()
  toggle()
  expect(toggleButton).toBeChecked()
})
