import * as React from 'react'
import {renderToggle, screen, userEvent} from '../../test/utils'
import App, {Toggle} from '../final/06'
// import App, {Toggle} from '../exercise/06'

test('toggling either toggle toggles both', async () => {
  renderToggle(<App />)
  const buttons = screen.getAllByTestId('toggle-input')
  const [toggleButton1, toggleButton2] = buttons
  await userEvent.click(toggleButton1)
  expect(toggleButton1).toBeChecked()
  expect(toggleButton2).toBeChecked()

  await userEvent.click(toggleButton2)
  expect(toggleButton1).not.toBeChecked()
  expect(toggleButton2).not.toBeChecked()
})

test('toggle can still be uncontrolled', async () => {
  const {toggleButton, toggle} = renderToggle(<Toggle />)
  expect(toggleButton).not.toBeChecked()
  await toggle()
  expect(toggleButton).toBeChecked()
})
