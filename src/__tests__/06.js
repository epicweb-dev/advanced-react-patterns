import React from 'react'
import {renderToggle, fireEvent} from '../../test/utils'
import Usage from '../exercises-final/06'
// import Usage from '../exercises/06'

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

test('can also toggle with the custom button', () => {
  const {toggleButton, getByLabelText} = renderToggle(<Usage />)
  expect(toggleButton).toBeOff()
  fireEvent.click(getByLabelText('custom-button'))
  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "onButtonClick",
  ],
  Array [
    "onToggle",
    true,
  ],
]
`)
})

test('passes custom props to the custom-button', () => {
  const {getByLabelText, toggleButton} = renderToggle(<Usage />)
  const customButton = getByLabelText('custom-button')
  expect(customButton.getAttribute('id')).toBe('custom-button-id')

  fireEvent.click(customButton)

  expect(toggleButton).toBeOn()
  expect(console.info.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "onButtonClick",
  ],
  Array [
    "onToggle",
    true,
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
http://ws.kcd.im/?ws=react%20patterns&e=06&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
