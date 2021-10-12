import * as React from 'react'
import {renderToggle, screen, userEvent} from '../../test/utils'
import App, {Toggle} from '../final/06'
// import App, {Toggle} from '../exercise/06'

test('toggling either toggle toggles both', () => {
  renderToggle(<App />)
  const buttons = screen.getAllByTestId('toggle-button')
  const [toggleButton1, toggleButton2] = buttons
  if (!toggleButton1 || !toggleButton2) {
    throw new Error('Could not find both toggle buttons')
  }
  userEvent.click(toggleButton1)
  expect(toggleButton1).toHaveAttribute('aria-pressed', 'true')
  expect(toggleButton2).toHaveAttribute('aria-pressed', 'true')

  userEvent.click(toggleButton2)
  expect(toggleButton1).toHaveAttribute('aria-pressed', 'false')
  expect(toggleButton2).toHaveAttribute('aria-pressed', 'false')
})

test('toggle can still be uncontrolled', () => {
  const {getToggle, toggle} = renderToggle(<Toggle />)
  expect(getToggle()).toHaveAttribute('aria-pressed', 'false')
  toggle()
  expect(getToggle()).toHaveAttribute('aria-pressed', 'true')
})
