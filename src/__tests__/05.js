import React from 'react'
import {renderToggle, fireEvent} from '../../test/utils'
import Usage from '../exercises-final/05'
// import Usage from '../exercises/05'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toEqual([['onToggle', true]])
})

test('can also toggle with the custom button', () => {
  const {toggleButton, getByLabelText} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  fireEvent.click(getByLabelText('custom-button'))
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toEqual([['onToggle', true]])
})
