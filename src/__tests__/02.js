import React from 'react'
import {renderToggle} from '../../test/utils'
import Usage from '../exercises-final/02'
// import Usage from '../exercises/02'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  toggle()
  expect(toggleButton).toBeOff()
})
