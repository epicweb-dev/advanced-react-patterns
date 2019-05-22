import React from 'react'
import {renderToggle} from '../../test/utils'
import Usage from '../exercises-final/04'
// import Usage from '../exercises/04'

test('renders a toggle component', () => {
  const {toggleButton, toggle, container} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
  toggle()
  expect(toggleButton).toBeOn()
  expect(container.textContent).toMatch('The button is on')
  expect(container.textContent).not.toMatch('The button is off')
  toggle()
  expect(toggleButton).toBeOff()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
})
