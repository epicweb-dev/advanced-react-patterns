import React from 'react'
import {renderToggle, fireEvent} from '../../test/utils'
import Usage from '../exercises-final/07'
// import Usage, { Toggle } from '../exercises/07'

test('renders a toggle component', () => {
  const {toggleButton, toggle} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  toggle()
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "onToggle",
    true,
  ],
]
`)
})

test('can reset the state of the toggle', () => {
  const {toggleButton, toggle, getByText} = renderToggle(<Usage />)
  toggle()
  fireEvent.click(getByText('Reset'))
  expect(toggleButton).toBeOff()
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "onToggle",
    true,
  ],
  Array [
    "onReset",
    false,
  ],
]
`)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react%20patterns&e=07&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
