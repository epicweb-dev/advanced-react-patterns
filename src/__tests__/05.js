import React from 'react'
import {renderToggle, fireEvent} from '../../test/utils'
import Usage from '../exercises-final/05'
// import Usage from '../exercises/05'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  toggle()
  expect(toggleButton).toBeOff()
})

test('can also toggle with the custom button', () => {
  const {toggleButton, getByLabelText} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  fireEvent.click(getByLabelText('custom-button'))
  expect(toggleButton).toBeOn()
})

// 💯 remove the `.skip` if you're working on the extra credit
test.skip('passes custom props to the custom-button', () => {
  const {getByLabelText, toggleButton} = renderToggle(<Usage />)
  const customButton = getByLabelText('custom-button')
  expect(customButton.getAttribute('id')).toBe('custom-button-id')

  fireEvent.click(customButton)

  expect(toggleButton).toBeOn()
})
