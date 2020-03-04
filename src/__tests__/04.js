import React from 'react'
import {renderToggle, screen, fireEvent} from '../../test/utils'
import Usage from '../final/04'
// import Usage from '../exercise/04'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).not.toBeChecked()
  toggle()
  expect(toggleButton).toBeChecked()
  toggle()
  expect(toggleButton).not.toBeChecked()
})

test('can also toggle with the custom button', () => {
  const {toggleButton} = renderToggle(<Usage />)
  expect(toggleButton).not.toBeChecked()
  fireEvent.click(screen.getByLabelText('custom-button'))
  expect(toggleButton).toBeChecked()
})

// 💯 remove the `.skip` if you're working on the extra credit
test.skip('passes custom props to the custom-button', () => {
  const {toggleButton} = renderToggle(<Usage />)
  const customButton = screen.getByLabelText('custom-button')
  expect(customButton.getAttribute('id')).toBe('custom-button-id')

  fireEvent.click(customButton)

  expect(toggleButton).toBeChecked()
})
