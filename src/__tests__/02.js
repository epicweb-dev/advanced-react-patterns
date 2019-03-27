import React from 'react'
import {renderToggle} from '../../test/utils'
import Usage from '../exercises-final/02'
// import Usage from '../exercises/02'

test('renders a toggle component', () => {
  const handleToggle = jest.fn()
  const {toggleButton, toggle, container} = renderToggle(
    <Usage onToggle={handleToggle} />,
  )
  expect(toggleButton).toBeOff()
  expect(container.textContent).toMatch('The button is off')
  expect(container.textContent).not.toMatch('The button is on')
  toggle()
  expect(toggleButton).toBeOn()
  expect(container.textContent).toMatch('The button is on')
  expect(container.textContent).not.toMatch('The button is off')
  expect(handleToggle).toHaveBeenCalledTimes(1)
  expect(handleToggle).toHaveBeenCalledWith(true)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react%20patterns&e=02&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
