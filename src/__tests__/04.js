import React from 'react'
import {renderToggle, screen, userEvent} from '../../test/utils'
import App from '../final/04'
// import App from '../exercise/04'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  toggle()
  expect(toggleButton).toBeChecked()
  toggle()
  expect(toggleButton).not.toBeChecked()
})

test('can also toggle with the custom button', () => {
  const {toggleButton} = renderToggle(<App />)
  expect(toggleButton).not.toBeChecked()
  userEvent.click(screen.getByLabelText('custom-button'))
  expect(toggleButton).toBeChecked()
})

// 💯 remove the `.skip` if you're working on the extra credit
test.skip('passes custom props to the custom-button', () => {
  const {toggleButton} = renderToggle(<App />)
  const customButton = screen.getByLabelText('custom-button')
  expect(customButton.getAttribute('id')).toBe('custom-button-id')

  userEvent.click(customButton)

  expect(toggleButton).toBeChecked()
})
