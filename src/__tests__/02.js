import React from 'react'
import {renderToggle} from '../../test/utils'
import Usage from '../final/02'
// import Usage from '../exercise/02'

test('renders a toggle component', () => {
  const {toggleButton, toggle, container} = renderToggle(<Usage />)
  expect(toggleButton).not.toBeChecked()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
  toggle()
  expect(toggleButton).toBeChecked()
  expect(container.textContent).toMatch('The button is on')
  expect(container.textContent).not.toMatch('The button is off')
  toggle()
  expect(toggleButton).not.toBeChecked()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
})
